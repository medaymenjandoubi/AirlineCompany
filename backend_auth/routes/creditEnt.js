const express = require('express');
const { getCREDIT_ENTData ,postCREDIT_ENTData} = require('../controllers/creditEnt');

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
// get (all) route for credit ent
router.get('/get-data/credit-ent',getCREDIT_ENTData)
router.post('/post-data/credit-ent',postCREDIT_ENTData)
module.exports = router;