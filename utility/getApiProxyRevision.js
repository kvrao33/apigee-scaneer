const generateToken = require('./generateToken.js');
const axios = require('axios');
const logger = require('./logger.js');

const orgname = "third-octagon-427015-c4";
const token = await generateToken();
const revision = 1;

async function getApiProxyRevision(orgname,token,revision){
    try{
        const proxyRevision = await axios.get(`https://apigee.googleapis.com/v1/organizations/${orgname}/apis/hello-world/revisions/${revision}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return proxyRevision.data;
    }catch(error){
        logger.error("Error : ",error.message);
    }
}
await getApiProxyRevision(orgname,token,revision);

module.exports = getApiProxyRevision;
