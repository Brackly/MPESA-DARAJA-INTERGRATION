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

const callback = async (req,res) => {
  const transactionUrl = process.env.TRANSACTION_URL
    try{
      const {TransAmount,BusinessShortCode,BillRefNumber,TransTime} = req.body

      const {response} = await axios(
        {
          "method":"Post",
          "url": process.env.TRANSACTION_URL,
          "data":data,
          "headers":{
            'Content-Type': 'application/json',
          }
          
      });
      res.sendStatus(200)
    }catch(err){
      console.log(err)
    }
  };

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