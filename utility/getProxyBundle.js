const axios = require('axios');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');
const logger = require('./logger.js');


const downloadAndUnzipProxy = async (orgName, proxyName,rev, token) => {
  const apiUrl = `https://apigee.googleapis.com/v1/organizations/${orgName}/apis/${proxyName}/revisions/${rev}?format=bundle`;
  const localFilePath = path.join(process.cwd()+'/proxyBundle', `${proxyName}.zip`);
  const localUnzipPath = path.join(process.cwd()+'/proxyBundle', proxyName+"_rev"+rev);

  try {
    
    // Download the proxy bundle
    const response = await axios({
      method: 'get',
      url: apiUrl,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType: 'stream'
    });

    // Save the downloaded bundle to a local file
    const writer = fs.createWriteStream(localFilePath);
    response.data.pipe(writer);

    // Wait until the file is fully written
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Unzip the downloaded file
    await fs.createReadStream(localFilePath)
      .pipe(unzipper.Extract({ path: localUnzipPath }))
      .promise();
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    logger.error('Error response data:'+error.response.data);
      logger.error('Error response status:'+error.response.status);
      logger.error('Error response headers:'+error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      logger.error('Error request:'+error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error('Error message:'+error.message);
    }
    logger.error('Error config:'+error.config);
  } finally {
    // Clean up the zip file if needed
    fs.unlinkSync(localFilePath);
  }
  return localUnzipPath;
};

module.exports = downloadAndUnzipProxy;


// Example usage
// downloadAndUnzipProxy('third-octagon-427015-c4', 'hello-world', 'eval', 'YOUR_ACCESS_TOKEN_HERE');
