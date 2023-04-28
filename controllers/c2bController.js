
const RegisterUrl = async (req, res) => {
    res.status(200).json(req.body)
  };
  
  const GetMpesaPayment = async (req, res) => {
    res.status(200).json({message:"c2b controller"})
  };
  
  module.exports = {
    RegisterUrl,
    GetMpesaPayment,
  };