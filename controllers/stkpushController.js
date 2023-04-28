const axios = require('axios')
require('dotenv').config();

const url = `${process.env.URL}/mpesa/stkpush/v1/processrequest`

const post = async (req, res) => {
  const {BusinessShortCode,TransactionType,Amount,PhoneNumber,AccountReference,TransactionDesc} = req.body
  const data= {    
                "BusinessShortCode": BusinessShortCode,    
                "Password": process.env.PASSWORD,
                "Timestamp":process.env.TIMESTAMP,    
                "TransactionType": TransactionType,    
                "Amount": Amount,    
                "PartyA": PhoneNumber,    
                "PartyB":BusinessShortCode,    
                "PhoneNumber":PhoneNumber,    
                "CallBackURL": process.env.CALLBACK_URL,   
                "AccountReference":AccountReference,    
                "TransactionDesc":TransactionDesc
            }
  try{
      const {response} = await axios(
      {
        "method":"Post",
        "url":url,
        "data":data,
        "headers":{
          'Authorization': `Bearer ${req.token}`,
          'Content-Type': 'application/json'
        }
        
    });
    res.status(200).json(response)
  }catch(err){
    console.log
      res.status(500).json(err.message)
  }
  };
  
  const get = async (req, res) => {
    res.status(200).json({message:req.token})
  };
  
  module.exports = {
    post,
    get,
  };