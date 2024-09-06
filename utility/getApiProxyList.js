const generateToken = require('./generateToken');
const axios = require('axios');

const orgname = "third-octagon-427015-c4";
const token = await generateToken();

async function getApiProxyList(orgname,token){
    try{
        const apiList = await axios.get(`https://apigee.googleapis.com/v1/organizations/${orgname}/deployments`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        console.log(apiList.data);
        return apiList.data;
    }catch(error){
        console.error("Error : ",error.message);
    }
}
await getApiProxyList(orgname,token);

module.exports = getApiProxyList;
