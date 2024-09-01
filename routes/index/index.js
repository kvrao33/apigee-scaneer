// routes/index.js
import express from 'express';
import axios from 'axios';
import generateToken from '../../utility/generateToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const accessToken = await generateToken()

        // Make the API call with the access token
        const response = await axios.get('https://apigee.googleapis.com/v1/organizations/third-octagon-427015-c4/apis', {
            params: {
                includeRevisions: true
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        });

        const proxies = response.data.proxies;

        res.render('index', { proxies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

export default router;
