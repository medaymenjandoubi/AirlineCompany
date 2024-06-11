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

async function getCREDIT_TypeData(req, res) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM [dbo].[CREDIT_TYP_processed]');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching CREDIT_ENT data:', error);
        res.status(500).send('Error fetching CREDIT_ENT data');
    }
}
async function postCREDIT_TypeData(req, res) {
    try {
        // Establish a connection to the database
        const pool = await sql.connect(config);
        
        // Get the data from the request body
        const {
            ECH_TYP_CLE,
            ECH_SOC,
            ECH_COD,
            ECH_LIB
        } = req.body;

        // Create the SQL query string with parameterized inputs
        const query = `
            INSERT INTO [dbo].[CREDIT_TYP_processed] (
                ECH_TYP_CLE,
                ECH_SOC,
                ECH_COD,
                ECH_LIB
            ) VALUES (
                @ECH_TYP_CLE,
                @ECH_SOC,
                @ECH_COD,
                @ECH_LIB
            )`;

        // Execute the query with parameterized values
        await pool.request()
            .input('ECH_TYP_CLE', sql.VarChar, ECH_TYP_CLE)
            .input('ECH_SOC', sql.VarChar, ECH_SOC)
            .input('ECH_COD', sql.VarChar, ECH_COD)
            .input('ECH_LIB', sql.VarChar, ECH_LIB)
            .query(query);

        // Send a success response
        res.status(200).send('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
    }
}
module.exports = {
    getCREDIT_TypeData,postCREDIT_TypeData
};
