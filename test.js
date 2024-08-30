import generateToken from "./utility/generateToken.js";
import downloadAndUnzipProxy from "./utility/getProxyBundle.js";


const orgName = 'third-octagon-427015-c4';
const proxyName = 'hello-world';
const rev = 1;
const token = await generateToken();

downloadAndUnzipProxy(orgName, proxyName, rev, token);