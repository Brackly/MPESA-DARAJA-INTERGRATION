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
    try{
      res.status(200).json(req.body)
    }catch(err){
      console.log(err)
    }
  };
  
  module.exports = {
    RegisterUrl,
    callback
  }