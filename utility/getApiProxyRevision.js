import generateToken from "./generateToken.js";
import axios from "axios";

const orgname = "third-octagon-427015-c4";
const token = await generateToken();
const revision = 1;

async function getApiProxyRevision(orgname,token){
    try{
        const proxyRevision = await axios.get(`https://apigee.googleapis.com/v1/organizations/${orgname}/apis/hello-world/revisions/${revision}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        console.log(proxyRevision.data);
        return proxyRevision.data;
    }catch(error){
        console.error("Error : ",error.message);
    }
}
await getApiProxyRevision(orgname,token);

export default getApiProxyRevision;