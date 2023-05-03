const axios = require('axios')
require('dotenv').config();
const post = async (req, res) => {
  const {BusinessShortCode,TransactionType,Amount,PhoneNumber,AccountReference,callBackURL,TransactionDesc} = req.body
  const {password,timestamp} =req.headers
  const url = `${req.endpoint_url}/mpesa/stkpush/v1/processrequest`
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
  console.log(req.body)
  try{
      response = await axios(
      {
        "method":"Post",
        "url":url,
        "data":data,
        "headers":{
          'Authorization': `Bearer ${req.token}`,
          'Content-Type': 'application/json'
        }
        
    });
    res.status(response.status).json({'response':response.data})
  }catch(err){
    res.status(500).json(err)
  }
  };
  
  const get = async (req, res) => {
    res.status(200).json({message:"Stk push active"})
  };
  
  module.exports = {
    post,
    get,
  };