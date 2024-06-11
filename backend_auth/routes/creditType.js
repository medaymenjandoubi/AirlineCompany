const express = require('express');
const { register } = require('../controllers/auth');

const router = express.Router();
const sql = require('mssql');
const { getCREDIT_TypeData,postCREDIT_TypeData } = require('../controllers/creditType');
const config = {
    server: 'DESKTOP-8GVPJNN',
    database: 'finance',
    user: 'tunisair_express',
    password: 'jasser123',
    options: {
        trustServerCertificate: true
    }
  };
// get (all) route for credit type 
  router.get('/get-data/credit-type', getCREDIT_TypeData);
  router.post('/post-data/credit-type', postCREDIT_TypeData);
  module.exports = router;