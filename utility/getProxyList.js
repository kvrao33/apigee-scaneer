import axios from 'axios';
import generateToken from './generateToken.js';

async function getProxyList(){
    try {
        const accessToken = await generateToken()
        const orgName=process.env.ORG_Name
        // Make the API call with the access token
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
    } catch (error) {
        console.error("Error : ",error.message);
    }
}

export default getProxyList;

 