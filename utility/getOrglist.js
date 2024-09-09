const generateToken = require('./generateToken.js');
const axios = require('axios');
const logger = require('./logger.js');

async function getApigeeOrgList(){
    try{
        const token = await generateToken();
        const orglist = await axios.get(`https://apigee.googleapis.com/v1/organizations`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return orglist.data.organizations;
    }catch(error){
       logger.error("Error : ",error.message);
    }
}

module.exports = getApigeeOrgList;
