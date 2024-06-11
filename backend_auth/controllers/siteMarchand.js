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

async function getSite_Marchand(req, res) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM [dbo].[SITE_MARCHAND_processed]');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching CREDIT_ENT data:', error);
        res.status(500).send('Error fetching CREDIT_ENT data');
    }
}
async function postSite_Marchand(req, res) {
    try {
        // Establish a connection to the database
        const pool = await sql.connect(config);
        
        // Get the data from the request body
        const {
            SITE_AFFILIATION,
            SITE_TYPE,
            SITE_AUTOR,
            SITE_DATE,
            SITE_TYPECARD,
            SITE_NUMLIGNE,
            SITE_NCARTP,
            SITE_MONTANT,
            SITE_MTDEVISE,
            SITE_COMM,
            SITE_TVA,
            SITE_ETAT,
            SITE_DEV,
            SITE_NUMDOC,
            SITE_IDENT,
            SITE_NUMDOCCOM,
            SITE_SIGNE,
            SITE_DMAJ
        } = req.body;

        // Create the SQL query string with parameterized inputs
        const query = `
            INSERT INTO [dbo].[SITE_MARCHAND_processed] (
                SITE_AFFILIATION,
                SITE_TYPE,
                SITE_AUTOR,
                SITE_DATE,
                SITE_TYPECARD,
                SITE_NUMLIGNE,
                SITE_NCARTP,
                SITE_MONTANT,
                SITE_MTDEVISE,
                SITE_COMM,
                SITE_TVA,
                SITE_ETAT,
                SITE_DEV,
                SITE_NUMDOC,
                SITE_IDENT,
                SITE_NUMDOCCOM,
                SITE_SIGNE,
                SITE_DMAJ
            ) VALUES (
                @SITE_AFFILIATION,
                @SITE_TYPE,
                @SITE_AUTOR,
                @SITE_DATE,
                @SITE_TYPECARD,
                @SITE_NUMLIGNE,
                @SITE_NCARTP,
                @SITE_MONTANT,
                @SITE_MTDEVISE,
                @SITE_COMM,
                @SITE_TVA,
                @SITE_ETAT,
                @SITE_DEV,
                @SITE_NUMDOC,
                @SITE_IDENT,
                @SITE_NUMDOCCOM,
                @SITE_SIGNE,
                @SITE_DMAJ
            )`;

        // Execute the query with parameterized values
        await pool.request()
            .input('SITE_AFFILIATION', sql.VarChar, SITE_AFFILIATION)
            .input('SITE_TYPE', sql.VarChar, SITE_TYPE)
            .input('SITE_AUTOR', sql.VarChar, SITE_AUTOR)
            .input('SITE_DATE', sql.DateTime, SITE_DATE)
            .input('SITE_TYPECARD', sql.VarChar, SITE_TYPECARD)
            .input('SITE_NUMLIGNE', sql.VarChar, SITE_NUMLIGNE)
            .input('SITE_NCARTP', sql.VarChar, SITE_NCARTP)
            .input('SITE_MONTANT', sql.Decimal, SITE_MONTANT)
            .input('SITE_MTDEVISE', sql.Decimal, SITE_MTDEVISE)
            .input('SITE_COMM', sql.Decimal, SITE_COMM)
            .input('SITE_TVA', sql.Decimal, SITE_TVA)
            .input('SITE_ETAT', sql.VarChar, SITE_ETAT)
            .input('SITE_DEV', sql.VarChar, SITE_DEV)
            .input('SITE_NUMDOC', sql.VarChar, SITE_NUMDOC)
            .input('SITE_IDENT', sql.VarChar, SITE_IDENT)
            .input('SITE_NUMDOCCOM', sql.VarChar, SITE_NUMDOCCOM)
            .input('SITE_SIGNE', sql.VarChar, SITE_SIGNE)
            .input('SITE_DMAJ', sql.DateTime, SITE_DMAJ)
            .query(query);

        // Send a success response
        res.status(200).send('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
    }
}

module.exports = {
    getSite_Marchand,postSite_Marchand
};
