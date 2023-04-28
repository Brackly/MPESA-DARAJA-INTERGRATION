
const post = async (req, res) => {
  res.status(200).json(req.body)
};

const get = async (req, res) => {
  res.status(200).json({msg:req.token})
};

module.exports = {
  post,
  get,
};