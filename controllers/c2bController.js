const axios = require('axios')
require('dotenv').config();
const mariadb = require('mariadb');
const moment = require('moment-timezone');

const createTime = () =>{
  const now = moment().tz('Africa/Nairobi');
  return now.toISOString();
}

async function insertPayment(payment,Reconciled) {
  let conn;
  try {
    conn = await mariadb.createConnection({
      host: process.env.HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DATABASE_PORT
    });

    const sql = `INSERT INTO payments 
                 (TransID,TransactionType, TransTime, TransAmount, BusinessShortCode, BillRefNumber, InvoiceNumber, ThirdPartyTransID, MSISDN, FirstName, MiddleName, LastName,Reconciled)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      payment.TransID,
      payment.TransactionType,
      createTime(),
      parseFloat(payment.TransAmount),
      payment.BusinessShortCode,
      payment.BillRefNumber,
      payment.InvoiceNumber,
      payment.ThirdPartyTransID,
      payment.MSISDN,
      payment.FirstName,
      payment.MiddleName,
      payment.LastName,
      Reconciled
    ];

    const result = await conn.query(sql, values);
    console.log(`Inserted payment with ID ${result.insertId}`);
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) conn.end();
  }
}

const RegisterUrl = async (req, res) => {
  const url = `${req.endpoint_url}/mpesa/c2b/v1/registerurl`
  const {ShortCode,ResponseType,ConfirmationURL,ValidationURL} = req.body
  if (!ResponseType){
    ResponseType = "Cancelled"
  }
  const data =   {    
                    "ShortCode": ShortCode,
                    "ResponseType":ResponseType,
                    "ConfirmationURL":ConfirmationURL,
                    "ValidationURL":ValidationURL
                }
  console.log(data)
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
      res.status(500).json(err)
  }
  };

  // Callback url
const callback = async (req,res) => {
  const {Body} = req.body
  if(Body.stkCallback.ResultCode==0)
  {
  let Reconciled=false;
  const TransAmount=Body.stkCallback.CallbackMetadata.Item[0].Value
  const req_data = {
    "currency": "KES",
    "entityId": "001",
    "transactionDate": createTime(),
    "partTrans": [
      {
        "accountType": "string",
        "acid": BillRefNumber,
        "partTranType": "Debit",
        "transactionAmount": TransAmount,
        "transactionDate": createTime(),
        "transactionParticulars": "string"
      },
    {
        "accountType": "string",
        "acid": "270000",
        "partTranType": "Credit",
        "transactionAmount": TransAmount,
        "transactionDate": createTime(),
        "transactionParticulars": "string"
      }
    ],
    "transactionType": "Transfer",
    "totalAmount": TransAmount
  }
  try{
    const response = await axios(
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
    Reconciled=true
    insertPayment(req.body,Reconciled);
    res.status(200).json({'message':'Transaction saved and reconciled'});
  }catch(err){
    insertPayment(req.body,Reconciled);
    res.status(200).json({message:"Transaction saved but not reconciled"})
  }
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