// routes/index.js
import express from 'express';
import getProxyList from '../../utility/getProxyList.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const proxies = await getProxyList();
        res.render('index', { proxies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

export default router;
