import generateToken from "./generateToken.js";
import axios from "axios";



async function getApigeeOrgList(){
    try{
        const token = await generateToken();
        const orglist = await axios.get(`https://apigee.googleapis.com/v1/organizations`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        // console.log(orglist.data);
        return orglist.data.organizations;
    }catch(error){
        console.error("Error : ",error.message);
    }
}

export default getApigeeOrgList;