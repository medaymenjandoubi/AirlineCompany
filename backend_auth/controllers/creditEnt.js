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

async function getCREDIT_ENTData(req, res) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM [dbo].[CREDIT_ENT_processed]');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching CREDIT_ENT data:', error);
        res.status(500).send('Error fetching CREDIT_ENT data');
    }
}
const postCREDIT_ENTData = async (req, res) => {
    try {
        // Establish a connection to the database
        const pool = await sql.connect(config);

        // Get the data from the request body
        const {
            ECH_CLE,
            ECH_NUM,
            ECH_SOC,
            ECH_TITRE,
            ECH_Montant,
            ECH_PrincArr,
            ECH_Devise,
            ECH_Banque,
            ECH_TYPE,
            ECH_DATEDEBLOG,
            ECH_DatePrem,
            ECH_intretTrim,
            ECH_MARGEBANC_VARI,
            ECH_TAUX_INTERET,
            ECH_MARGE_BANC,
            ECH_DUREE_FINANC,
            ECH_BASE_CALCUL,
            ECH_MONAIS_FIN,
            ECH_MONAIS_REMB,
            ECH_DureeUnite,
            ECH_TYP_CLE
        } = req.body;

        // Create the SQL query string with parameterized inputs
        const query = `
            INSERT INTO [dbo].[CREDIT_ENT_processed] (
                ECH_CLE,
                ECH_NUM,
                ECH_SOC,
                ECH_TITRE,
                ECH_Montant,
                ECH_PrincArr,
                ECH_Devise,
                ECH_Banque,
                ECH_TYPE,
                ECH_DATEDEBLOG,
                ECH_DatePrem,
                ECH_intretTrim,
                ECH_MARGEBANC_VARI,
                ECH_TAUX_INTERET,
                ECH_MARGE_BANC,
                ECH_DUREE_FINANC,
                ECH_BASE_CALCUL,
                ECH_MONAIS_FIN,
                ECH_MONAIS_REMB,
                ECH_DureeUnite,
                ECH_TYP_CLE
            ) VALUES (
                @ECH_CLE,
                @ECH_NUM,
                @ECH_SOC,
                @ECH_TITRE,
                @ECH_Montant,
                @ECH_PrincArr,
                @ECH_Devise,
                @ECH_Banque,
                @ECH_TYPE,
                @ECH_DATEDEBLOG,
                @ECH_DatePrem,
                @ECH_intretTrim,
                @ECH_MARGEBANC_VARI,
                @ECH_TAUX_INTERET,
                @ECH_MARGE_BANC,
                @ECH_DUREE_FINANC,
                @ECH_BASE_CALCUL,
                @ECH_MONAIS_FIN,
                @ECH_MONAIS_REMB,
                @ECH_DureeUnite,
                @ECH_TYP_CLE
            )`;

        // Execute the query with parameterized values
        await pool.request()
            .input('ECH_CLE', sql.VarChar, ECH_CLE)
            .input('ECH_NUM', sql.VarChar, ECH_NUM)
            .input('ECH_SOC', sql.VarChar, ECH_SOC)
            .input('ECH_TITRE', sql.VarChar, ECH_TITRE)
            .input('ECH_Montant', sql.Decimal, ECH_Montant)
            .input('ECH_PrincArr', sql.VarChar, ECH_PrincArr)
            .input('ECH_Devise', sql.VarChar, ECH_Devise)
            .input('ECH_Banque', sql.VarChar, ECH_Banque)
            .input('ECH_TYPE', sql.VarChar, ECH_TYPE)
            .input('ECH_DATEDEBLOG', sql.DateTime, ECH_DATEDEBLOG)
            .input('ECH_DatePrem', sql.DateTime, ECH_DatePrem)
            .input('ECH_intretTrim', sql.VarChar, ECH_intretTrim)
            .input('ECH_MARGEBANC_VARI', sql.VarChar, ECH_MARGEBANC_VARI)
            .input('ECH_TAUX_INTERET', sql.Decimal, ECH_TAUX_INTERET)
            .input('ECH_MARGE_BANC', sql.Decimal, ECH_MARGE_BANC)
            .input('ECH_DUREE_FINANC', sql.VarChar, ECH_DUREE_FINANC)
            .input('ECH_BASE_CALCUL', sql.VarChar, ECH_BASE_CALCUL)
            .input('ECH_MONAIS_FIN', sql.VarChar, ECH_MONAIS_FIN)
            .input('ECH_MONAIS_REMB', sql.VarChar, ECH_MONAIS_REMB)
            .input('ECH_DureeUnite', sql.VarChar, ECH_DureeUnite)
            .input('ECH_TYP_CLE', sql.VarChar, ECH_TYP_CLE)
            .query(query);

        // Send a success response
        res.status(200).send('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
    }
};

module.exports = {
    getCREDIT_ENTData,postCREDIT_ENTData
};
