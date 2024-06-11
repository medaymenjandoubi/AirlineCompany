const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { getSite_Marchand,postSite_Marchand } = require('../controllers/siteMarchand');
const config = {
    server: 'DESKTOP-8GVPJNN',
    database: 'finance',
    user: 'tunisair_express',
    password: 'jasser123',
    options: {
        trustServerCertificate: true
    }
  };
// get (all) route for site marchand
  router.get('/get-data/site-marchand', getSite_Marchand);
  router.post("/post-data/site-marchand",postSite_Marchand);
  module.exports = router;