const generateToken = require('./generateToken');
const axios = require('axios');
const logger = require('./logger.js');

const orgname = "third-octagon-427015-c4";
const token = await generateToken();

async function getApiProxyList(orgname,token){
    try{
        const apiList = await axios.get(`https://apigee.googleapis.com/v1/organizations/${orgname}/deployments`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return apiList.data;
    }catch(error){
       logger.error(error.message);
    }
}
await getApiProxyList(orgname,token);

module.exports = getApiProxyList;
