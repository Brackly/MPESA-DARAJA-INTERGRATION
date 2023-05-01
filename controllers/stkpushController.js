const axios = require('axios')
require('dotenv').config();
const post = async (req, res) => {
  const {BusinessShortCode,TransactionType,Amount,PhoneNumber,AccountReference,callBackURL,TransactionDesc} = req.body
  const {password,timestamp} =req.headers
  console.log(req.endpoint_url)
  const data= {    
                "BusinessShortCode": BusinessShortCode,    
                "Password": password,
                "Timestamp":timestamp,
                "TransactionType": TransactionType,    
                "Amount": parseInt(Amount),    
                "PartyA": parseInt(PhoneNumber),    
                "PartyB": parseInt(BusinessShortCode),    
                "PhoneNumber":parseInt(PhoneNumber), 
                "CallBackURL": callBackURL,   
                "AccountReference":AccountReference,    
                "TransactionDesc":TransactionDesc
            }
  try{
      const {response} = await axios(
      {
        "method":"Post",
        "url":req.endpoint_url,
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
    res.status(200).json({message:"Stk push active"})
  };
  
  module.exports = {
    post,
    get,
  };