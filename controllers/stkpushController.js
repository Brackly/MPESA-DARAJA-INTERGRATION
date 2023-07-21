const axios = require("axios");
const moment = require("moment-timezone");
const createTime = () => {
  const now = moment().tz("Africa/Nairobi");
  return now.toISOString();
};
require("dotenv").config();
const post = async (req, res) => {
  let result={}
  const {
    Amount,
    PhoneNumber,
  } = req.body;
  const url = `${req.endpoint_url}/mpesa/stkpush/v1/processrequest`;
  const data = {
    BusinessShortCode: 174379,
    Password: process.env.PASSWORD,
    Timestamp: process.env.TIMESTAMP,
    TransactionType: "CustomerPayBillOnline",
    Amount: parseInt(Amount),
    PartyA: parseInt(PhoneNumber),
    PartyB: 174379,
    PhoneNumber: parseInt(PhoneNumber),
    CallBackURL: "https://brackly-supreme-goggles-7jwgpxgqw46hrxj6-3500.preview.app.github.dev/callback",
    AccountReference: "Company X",
    TransactionDesc: "Payment of Service",
  };
  try {
    response = await axios({
      method: "Post",
      url: url,
      data: data,
      headers: {
        Authorization: `Bearer ${req.token}`,
        "Content-Type": "application/json",
      },
    });
    if(response.status==200){
        result["ID"]=response.data.CheckoutRequestID,
        result["CustomerMessage"]= response.data.CustomerMessage,
        result["ResponseCode"]= response.data.ResponseCode,
        result["DateTime"]=createTime(),
        result["Amount"]=Amount,
        result["Phonenumber"]=PhoneNumber
    }else{
      result=response.data
    }
    res.status(response.status).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const get = async (req, res) => {
  res.status(200).json({ message: "Stk push active" });
};

const callback = async (req, res) => {
  const { Body } = req.body;
  console.log("hello")
    // try {
    //   const response = await axios({
    //     method: "Post",
    //     url: process.env.TRANSACTION_URL,
    //     data: req_data,
    //     headers: {
    //       "Content-Type": "application/json",
    //       userName: process.env.USERNAME,
    //       accept: "*/*",
    //       entityId: process.env.ENTITY_ID,
    //     },
    //   });
    //   Reconciled = true;
    //   insertPayment(req.body, Reconciled);
    //   res.status(200).json({ message: "Transaction saved and reconciled" });
    // } catch (err) {
    //   insertPayment(req.body, Reconciled);
    //   res.status(200).json({ message: "Transaction saved but not reconciled" });
    // }
};

module.exports = {
  post,
  get,
  callback
};
