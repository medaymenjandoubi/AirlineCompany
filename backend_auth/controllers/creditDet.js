const sql = require('mssql');

const config = {
    server: 'DESKTOP-8GVPJNN\\SQLEXPRESS',
    database: 'finance',
    user: 'tunisair_express',
    password: 'jasser123',
    options: {
        trustServerCertificate: true
    }
};

async function getCREDIT_DETData(req, res) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM [dbo].[CREDIT_DET_processed]');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching CREDIT_DET data:', error);
        res.status(500).send('Error fetching CREDIT_DET data');
    }
}

const postCREDIT_DETData = async (req, res) => {
    try {
        // Establish a connection to the database
        const pool = await sql.connect(config);
        
        // Get the data from the request body
        const {
            ECH_DET_CLE,
            ECH_ENT_CLE,
            ECH_DET_DATE_DU,
            ECH_DET_DATE_AU,
            ECH_DET_MT_Credit,
            ECH_DET_MT_AMORTI,
            ECH_DET_TAUX_INTR,
            ECH_DET_MARGE,
            ECH_DET_TOTAL_INTR,
            ECH_DET_TOTAL_REMB
        } = req.body;
        
        // Create the SQL query string with parameterized inputs
        const query = `
            INSERT INTO [dbo].[CREDIT_DET_processed] (
                ECH_DET_CLE,
                ECH_ENT_CLE,
                ECH_DET_DATE_DU,
                ECH_DET_DATE_AU,
                ECH_DET_MT_Credit,
                ECH_DET_MT_AMORTI,
                ECH_DET_TAUX_INTR,
                ECH_DET_MARGE,
                ECH_DET_TOTAL_INTR,
                ECH_DET_TOTAL_REMB
            ) VALUES (
                @ECH_DET_CLE,
                @ECH_ENT_CLE,
                @ECH_DET_DATE_DU,
                @ECH_DET_DATE_AU,
                @ECH_DET_MT_Credit,
                @ECH_DET_MT_AMORTI,
                @ECH_DET_TAUX_INTR,
                @ECH_DET_MARGE,
                @ECH_DET_TOTAL_INTR,
                @ECH_DET_TOTAL_REMB
            )`;
        
        // Execute the query with parameterized values
        await pool.request()
            .input('ECH_DET_CLE', sql.VarChar, ECH_DET_CLE)
            .input('ECH_ENT_CLE', sql.VarChar, ECH_ENT_CLE)
            .input('ECH_DET_DATE_DU', sql.DateTime, ECH_DET_DATE_DU)
            .input('ECH_DET_DATE_AU', sql.DateTime, ECH_DET_DATE_AU)
            .input('ECH_DET_MT_Credit', sql.Decimal, ECH_DET_MT_Credit)
            .input('ECH_DET_MT_AMORTI', sql.Decimal, ECH_DET_MT_AMORTI)
            .input('ECH_DET_TAUX_INTR', sql.Decimal, ECH_DET_TAUX_INTR)
            .input('ECH_DET_MARGE', sql.Decimal, ECH_DET_MARGE)
            .input('ECH_DET_TOTAL_INTR', sql.Decimal, ECH_DET_TOTAL_INTR)
            .input('ECH_DET_TOTAL_REMB', sql.Decimal, ECH_DET_TOTAL_REMB)
            .query(query);
        
        // Send a success response
        res.status(200).send('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
    }
};

module.exports = {
    getCREDIT_DETData,
    postCREDIT_DETData
};
