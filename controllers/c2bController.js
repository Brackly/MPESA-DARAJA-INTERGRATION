const axios = require('axios')
require('dotenv').config();
const RegisterUrl = async (req, res) => {
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
  
  module.exports = {
    RegisterUrl
  }