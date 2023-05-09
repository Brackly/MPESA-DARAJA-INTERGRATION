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
                    "acknowledgedBy": "string",
                    "acknowledgedFlag": "string",
                    "acknowledgedTime": "2023-05-09T08:40:25.211Z",
                    "approvalSentBy": "string",
                    "approvalSentFlag": "string",
                    "approvalSentTime": "2023-05-09T08:40:25.211Z",
                    "approvalSentTo": "string",
                    "batchCode": "string",
                    "chargeEventId": "string",
                    "chargePartran": [
                      {
                        "accountBalance": 0,
                        "accountType": "string",
                        "acid": "string",
                        "currency": "string",
                        "exchangeRate": "string",
                        "isoFlag": "string",
                        "partTranType": "string",
                        "sn": 0,
                        "transactionAmount": 0,
                        "transactionDate": "2023-05-09T08:40:25.211Z",
                        "transactionParticulars": "string"
                      }
                    ],
                    "chequeInstruments": [
                      {
                        "instrumentDate": "2023-05-09T08:40:25.211Z",
                        "instrumentNo": "string",
                        "instrumentType": "string",
                        "leafNo": 0,
                        "sn": 0
                      }
                    ],
                    "chequeType": "string",
                    "conductedBy": "string",
                    "currency": "string",
                    "deletedBy": "string",
                    "deletedFlag": "string",
                    "deletedTime": "2023-05-09T08:40:25.211Z",
                    "enteredBy": "string",
                    "enteredFlag": "string",
                    "enteredTime": "2023-05-09T08:40:25.211Z",
                    "entityId": "string",
                    "eodStatus": "string",
                    "modifiedBy": "string",
                    "modifiedFlag": "string",
                    "modifiedTime": "2023-05-09T08:40:25.211Z",
                    "mpesacode": "string",
                    "partTrans": [
                      {
                        "accountBalance": 0,
                        "accountType": "string",
                        "acid": "string",
                        "batchCode": "string",
                        "chargeFee": "string",
                        "currency": "string",
                        "exchangeRate": "string",
                        "isWelfare": true,
                        "isoFlag": "string",
                        "partTranType": "string",
                        "parttranIdentity": "string",
                        "sn": 0,
                        "transactionAmount": 0,
                        "transactionCode": "string",
                        "transactionDate": "2023-05-09T08:40:25.211Z",
                        "transactionParticulars": "string",
                        "welfareAction": "string",
                        "welfareCode": "string",
                        "welfareMemberCode": "string"
                      }
                    ],
                    "postedBy": "string",
                    "postedFlag": "string",
                    "postedTime": "2023-05-09T08:40:25.211Z",
                    "rejectedBy": "string",
                    "rejectedFlag": "string",
                    "rejectedReason": "string",
                    "rejectedTime": "2023-05-09T08:40:25.211Z",
                    "reversalPostedFlag": "string",
                    "reversalTransactionCode": "string",
                    "reversedBy": "string",
                    "reversedFlag": "string",
                    "reversedTime": "2023-05-09T08:40:25.211Z",
                    "reversedWithTransactionCode": "string",
                    "salaryuploadCode": "string",
                    "sn": 0,
                    "staffCustomerCode": "string",
                    "status": "string",
                    "tellerAccount": "string",
                    "totalAmount": 0,
                    "transactionCode": "string",
                    "transactionDate": "2023-05-09T08:40:25.211Z",
                    "transactionType": "string",
                    "verifiedBy": "string",
                    "verifiedBy_2": "string",
                    "verifiedFlag": "string",
                    "verifiedFlag_2": "string",
                    "verifiedTime": "2023-05-09T08:40:25.211Z",
                    "verifiedTime_2": "2023-05-09T08:40:25.211Z"
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
      res.status(data.status).json(data);
    }catch(err){
      console.log(err)
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