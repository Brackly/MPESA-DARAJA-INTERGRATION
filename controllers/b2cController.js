const axios = require('axios')
require('dotenv').config();

const url = `${process.env.URL}/mpesa/b2c/v1/paymentrequest`

const b2cController = async (req, res) => {
  const {InitiatorName,SecurityCredential,Amount,PhoneNumber,Paybill,Remarks,QueueTimeOutURL,ResultURL} = req.body
  
  const data= {
                "InitiatorName": InitiatorName,
                "SecurityCredential": SecurityCredential,
                "CommandID": "BusinessPayment",
                "Amount": parseInt(Amount),
                "PartyA": parseInt(PhoneNumber),
                "PartyB": parseInt(Paybill),
                "Remarks": Remarks,
                "QueueTimeOutURL": QueueTimeOutURL,
                "ResultURL": ResultURL,
                "Occassion": "",
              }
  try{
      const {data} = await axios(
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
    console.log
      res.status(500).json(err.message)
  }
  };

const get = async (req, res) => {
  res.status(200).json({msg:"B2C active"})
};

module.exports = {
  b2cController,
  get,
};