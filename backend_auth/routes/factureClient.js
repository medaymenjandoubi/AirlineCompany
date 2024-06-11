const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { getFacture_Client,postFacture_Client } = require('../controllers/factureClient');
const config = {
    server: 'DESKTOP-8GVPJNN',
    database: 'finance',
    user: 'tunisair_express',
    password: 'jasser123',
    options: {
        trustServerCertificate: true
    }
};
// get (all) route for facture client 
  router.get('/get-data/facture-client', getFacture_Client);
  router.post("/post-data/facture-client",postFacture_Client);
  module.exports = router;