
const generateToken = require("./generateToken.js");
const axios = require("axios");

async function getProxyList(orgName){
    const accessToken = await generateToken();    
    const response = await axios.get(`https://apigee.googleapis.com/v1/organizations/${orgName}/apis`, {
        params: {
            includeRevisions: true
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
        }
    });
    return response.data.proxies;
}

module.exports = getProxyList;

