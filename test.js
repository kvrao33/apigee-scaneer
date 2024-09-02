import apigeelint from "apigeelint";

const configuration = {
    debug: true,
    source: {
      type: 'filesystem',
      path: '/home/karthik/Downloads/cyber-sachet-gahp-integration-nonprod_rev76_2024_05_02/apiproxy',
      bundleType: 'apiproxy'
    },
    externalPluginsDirectory: undefined,
    excluded: {},
    maxWarnings: -1,
    profile: 'apigee',
    formatter: 'json.js',
    output:"none"
  }
const data= await apigeelint.bundleLinter.lint(configuration);
console.log(data.getReport());
let output=[]
// data.proxyEndpoints.forEach((data)=>{
//     console.log(data.report);
    
// });
// data.policies.forEach((data)=>{
//     console.log(data.report);
    
// });

 
