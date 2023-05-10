const axios = require('axios')
require('dotenv').config();


const RegisterUrl = async (req, res) => {
  const url = `${req.endpoint_url}/mpesa/c2b/v1/registerurl`
  const {ShortCode,ResponseType,ConfirmationURL,ValidationURL} = req.body
  if (!ResponseType){
    ResponseType = "Completed"
  }
  const data=   {    
                    "ShortCode": ShortCode,
                    "ResponseType":ResponseType,
                    "ConfirmationURL":ConfirmationURL,
                    "ValidationURL":ValidationURL
                }
  try{
    const response = await axios(
      {
        "method":"Post",
        "url":url,
        "data":data,
        "headers":{
          'Authorization': `Bearer ${req.token}`,
          'Content-Type': 'application/json'
        }
        
    });
    res.status(response.status).json(response.data)
  }catch(err){
    console.log
      res.status(500).json(err)
  }
  };

  // Callback url
const callback = async (req,res) => {
  const {TransAmount,BusinessShortCode,BillRefNumber,TransTime} = req.body
  
  const req_data = {
    "currency": "KES",
    "entityId": "001",
    "transactionDate": "2023-05-03T10:53:23.853Z",
    "partTrans": [
      {
        "accountType": "string",
        "acid": BillRefNumber,
        "partTranType": "Debit",
        "transactionAmount": TransAmount,
        "transactionDate": "2023-05-03T10:53:23.853Z",
        "transactionParticulars": "string"
      },
    {
        "accountType": "string",
        "acid": "270000",
        "partTranType": "Credit",
        "transactionAmount": TransAmount,
        "transactionDate": "2023-05-03T10:53:23.853Z",
        "transactionParticulars": "string"
      }
    ],
    "transactionType": "Transfer",
    "totalAmount": TransAmount
  }
  
  try{
    const {data} = await axios(
      {
        "method":"Post",
        "url": process.env.TRANSACTION_URL,
        "data":req_data,
        "headers":{
          'Content-Type': 'application/json',
          "userName": process.env.USERNAME,
          "accept": "*/*",
          "entityId": process.env.ENTITY_ID
        }
        
    });
    res.status(data.statusCode).json(data);
  }catch(err){
    console.log(err.message)
  }
  };


  // Validation url
const validation = async (req,res) => {
  const {BillRefNumber} = req.body
  const validationUrl = `${process.env.VALIDATION_URL}/${BillRefNumber}`
    try{
      const {data} = await axios(
        {
          "method":"Get",
          "url": validationUrl,
          "headers":{
            'Content-Type': 'application/json',
            "userName": process.env.USERNAME,
            "accept": "*/*",
            "entityId": process.env.ENTITY_ID
          }
          
      });
      if (data.message == "true"){
        res.status(200).json({    
                              "ResultCode": "0",
                              "ResultDesc": "Accepted",
                            });
      }else{
        res.status(200).json({    
                              "ResultCode": "C2B00011",
                              "ResultDesc": "Rejected",
                             });
      }
    }catch(err){
      console.log(err)
    }
  };
  
  module.exports = {
    RegisterUrl,
    callback,
    validation
  }