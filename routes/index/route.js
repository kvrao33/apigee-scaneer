// routes/index.js
const express = require('express');
const axios = require('axios');
const generateToken = require('../../utility/generateToken.js');
const getApigeeOrgList = require('../../utility/getOrglist.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {


        const apigeeOrgs = await getApigeeOrgList(); // Replace with your actual organizations
        
    res.render('welcome', { apigeeOrgs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;