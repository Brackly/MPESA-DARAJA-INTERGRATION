const axios = require('axios')
require('dotenv').config();
const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

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
  console.log(data)
  try{
      const {response} = await axios.post(
      {
        "method":"Post",
        "url":url,
        "data":data,
        "headers":{
          'Authorization': `Bearer ${req.token}`,
          'Content-Type': 'application/json'
        }
        
    });
    console.log(data)
    res.status(200).json(data)
  }catch(err){
      res.status(500).json({error:err.message})
  }
  };
  
  const get = async (req, res) => {
    res.status(200).json({message:"stkpush controller"})
  };
  
  module.exports = {
    post,
    get,
  };