const axios = require('axios')
require('dotenv').config();

const b2cController = async (req, res) => {
  const {InitiatorName,SecurityCredential,Amount,PhoneNumber,Paybill,Remarks,QueueTimeOutURL,ResultURL} = req.body
  const url = `${req.endpoint_url}/mpesa/b2c/v1/paymentrequest`
  const data= {
                "InitiatorName": InitiatorName,
                "SecurityCredential": SecurityCredential,
                "CommandID": "BusinessPayment",
                "Amount": parseInt(Amount),
                "PartyA": parseInt(Paybill),
                "PartyB": parseInt(PhoneNumber),
                "Remarks": Remarks,
                "QueueTimeOutURL": QueueTimeOutURL,
                "ResultURL": ResultURL,
                "Occassion": "",
              }
  console.log()
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
    console.log(response)
    res.status(response.status).json({'response':response.data})
  }catch(err){
    console.log
      res.status(500).json(err)
  }
  };

const get = async (req, res) => {
  res.status(200).json({msg:"B2C active"})
};

module.exports = {
  b2cController,
  get,
};