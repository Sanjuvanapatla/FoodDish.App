const express = require('express');

const router = express.Router();
const curry = require('../models/currymodels');

router.get('/getallcurries', async (req, res) => {
     try{
        const curries = await curry.find();
        res.send(curries);
     }catch(err){
        return res.status(500).send(err);
     }
});

module.exports = router;