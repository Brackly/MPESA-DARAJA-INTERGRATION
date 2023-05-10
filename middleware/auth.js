const axios = require('axios')
require('dotenv').config();
let url
const authHandler = async (req, res, next) => {
    const {consumerkey,consumersecret,environment} = req.headers
    if(environment=='production'){
         req.endpoint_url = process.env.PROD_URL
    }else{
        req.endpoint_url = process.env.DEV_URL
    }
    url = `${req.endpoint_url}/oauth/v1/generate?grant_type=client_credentials`
    const buffer = new Buffer.from(consumerkey+":"+consumersecret);
    const auth = `Basic ${buffer.toString('base64')}`;
    try{
        const {data} = await axios.get(url,{
            "headers":{
                "Authorization":auth
            }
        });
         req.token = data['access_token'];
        next()
    }catch(err){
        res.status(500).json(
            err
        );
    }
}

module.exports = authHandler