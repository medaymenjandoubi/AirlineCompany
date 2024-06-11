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

async function getFacture_Client(req, res) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM [dbo].[FACTURE_CLIENT_processed]');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching CREDIT_ENT data:', error);
        res.status(500).send('Error fetching CREDIT_ENT data');
    }
}
async function postFacture_Client(req, res) {
    try {
        // Establish a connection to the database
        const pool = await sql.connect(config);
        
        // Get the data from the request body
        const {
            EC_CODE,
            MO_CODE,
            FF_CODE,
            FC_CODE,
            JR_CODE,
            EC_LIGNE,
            EC_TYPE,
            EC_IMPGEN,
            EC_IMPTIERS,
            EC_MONIMPDEB,
            EC_MONIMPCRED,
            NAT_CODE,
            EC_POSITION,
            EC_TYPEDEB,
            EC_BASECALC_DEB,
            EC_BASECALC_CRE,
            EC_LIB_SCHEMA,
            N_DE_FACTURE,
            ANNEE_LIBELLE,
            CLIENT
        } = req.body;

        // Create the SQL query string with parameterized inputs
        const query = `
            INSERT INTO [dbo].[FACTURE_CLIENT_processed] (
                EC_CODE,
                MO_CODE,
                FF_CODE,
                FC_CODE,
                JR_CODE,
                EC_LIGNE,
                EC_TYPE,
                EC_IMPGEN,
                EC_IMPTIERS,
                EC_MONIMPDEB,
                EC_MONIMPCRED,
                NAT_CODE,
                EC_POSITION,
                EC_TYPEDEB,
                EC_BASECALC_DEB,
                EC_BASECALC_CRE,
                EC_LIB_SCHEMA,
                N_DE_FACTURE,
                ANNEE_LIBELLE,
                CLIENT
            ) VALUES (
                @EC_CODE,
                @MO_CODE,
                @FF_CODE,
                @FC_CODE,
                @JR_CODE,
                @EC_LIGNE,
                @EC_TYPE,
                @EC_IMPGEN,
                @EC_IMPTIERS,
                @EC_MONIMPDEB,
                @EC_MONIMPCRED,
                @NAT_CODE,
                @EC_POSITION,
                @EC_TYPEDEB,
                @EC_BASECALC_DEB,
                @EC_BASECALC_CRE,
                @EC_LIB_SCHEMA,
                @N_DE_FACTURE,
                @ANNEE_LIBELLE,
                @CLIENT
            )`;

        // Execute the query with parameterized values
        await pool.request()
            .input('EC_CODE', sql.VarChar, EC_CODE)
            .input('MO_CODE', sql.VarChar, MO_CODE)
            .input('FF_CODE', sql.VarChar, FF_CODE)
            .input('FC_CODE', sql.VarChar, FC_CODE)
            .input('JR_CODE', sql.VarChar, JR_CODE)
            .input('EC_LIGNE', sql.VarChar, EC_LIGNE)
            .input('EC_TYPE', sql.VarChar, EC_TYPE)
            .input('EC_IMPGEN', sql.VarChar, EC_IMPGEN)
            .input('EC_IMPTIERS', sql.VarChar, EC_IMPTIERS)
            .input('EC_MONIMPDEB', sql.Decimal, EC_MONIMPDEB)
            .input('EC_MONIMPCRED', sql.Decimal, EC_MONIMPCRED)
            .input('NAT_CODE', sql.VarChar, NAT_CODE)
            .input('EC_POSITION', sql.VarChar, EC_POSITION)
            .input('EC_TYPEDEB', sql.VarChar, EC_TYPEDEB)
            .input('EC_BASECALC_DEB', sql.Decimal, EC_BASECALC_DEB)
            .input('EC_BASECALC_CRE', sql.Decimal, EC_BASECALC_CRE)
            .input('EC_LIB_SCHEMA', sql.VarChar, EC_LIB_SCHEMA)
            .input('N_DE_FACTURE', sql.VarChar, N_DE_FACTURE)
            .input('ANNEE_LIBELLE', sql.VarChar, ANNEE_LIBELLE)
            .input('CLIENT', sql.VarChar, CLIENT)
            .query(query);

        // Send a success response
        res.status(200).send('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
    }
}
module.exports = {
    getFacture_Client,postFacture_Client
};
