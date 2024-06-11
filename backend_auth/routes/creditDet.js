const express = require('express');
const { getCREDIT_DETData,postCREDIT_DETData } = require('../controllers/creditDet');

const router = express.Router();
const sql = require('mssql');
const config = {
    server: 'DESKTOP-8GVPJNN',
    database: 'finance',
    user: 'tunisair_express',
    password: 'jasser123',
    options: {
        trustServerCertificate: true
    }
  };

// get (all) route for credit det
router.get('/get-data/credit-det', getCREDIT_DETData);
router.post("/post-data/credit-det",postCREDIT_DETData)

module.exports = router;