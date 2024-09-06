// routes/index.js
import express from 'express';
import axios from 'axios';
import generateToken from '../../utility/generateToken.js';

const router = express.Router();
console.log("Get proxies");

router.post('/', async (req, res) => {
    try {
console.log("inside Post");

        const accessToken = await generateToken()
        const orgName=req.body.organization
        // Make the API call with the access token
        console.log(orgName);
        
        const response = await axios.get(`https://apigee.googleapis.com/v1/organizations/${orgName}/apis`, {
            params: {
                includeRevisions: true
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        });

        const proxies = response.data.proxies;

        res.render('proxies', { proxies , orgName});
        // res.redirect(`/next-page?org=${selectedOrg}`);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

export default router;
