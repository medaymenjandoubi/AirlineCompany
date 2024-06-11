const sql = require('mssql');
const { hashPassword, comparePassword } = require('../utils/auth');
const jwt = require('jsonwebtoken')
const config = {
    server: 'DESKTOP-8GVPJNN',
    database: 'finance',
    user: 'tunisair_express',
    password: 'jasser123',
    options: {
        trustServerCertificate: true
    }
};
async function currentuser(req, res) {
    try {
        console.log("this is the request ", req.auth._id);

        const pool = await sql.connect(config);
        const userExistQuery = `SELECT * FROM [dbo].[user] WHERE user_id = @UserId`;
        
        // Ensure req.auth._id is properly formatted (e.g., as a string)
        const userId = String(req.auth._id);
        
        const userExistResult = await pool
            .request()
            // Pass userId as input
            .input('UserId', sql.VarChar, userId) 
            .query(userExistQuery);

        console.log("CURRENT_User", userExistResult);
        return res.json({ok: true});
    } catch (error) {
        console.log("this is the error",error);
        // Handle the error appropriately
        //return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function register(req, res) {
    console.log(req.body);
    try {
        const { name, email, password, role } = req.body;

        if (!name) return res.status(400).send("Name is required");
        if (!password || password.length < 6) {
            return res.status(400).send("Password is required and should be minimum 6 characters long");
        }

    // Connect to the SQL database
        const pool = await sql.connect(config);

    // Check if the user exists
        const userExistQuery = `SELECT * FROM [dbo].[user] WHERE email = @Email`;
        const userExistResult = await pool.request()
            .input('Email', sql.VarChar, email)
            .query(userExistQuery);

        if (userExistResult.recordset.length > 0) {
            return res.status(400).send("Email is taken");
        }

    // Hash the password
        const hashedPassword = await hashPassword(password);

    // Insert the new user into the database
        const insertUserQuery = `
            INSERT INTO [dbo].[user] (name, email, password, role)
            VALUES (@Name, @Email, @Password, @Role)
        `;
        await pool.request()
            .input('Name', sql.VarChar, name)
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, hashedPassword)
            .input('Role', sql.VarChar, role)
            .query(insertUserQuery);

        console.log('Saved user:', { name, email });
        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
        return res.status(400).send('Error. Try Again');
    }
}


async function login(req,res){
    try {
    //console.log(req.body)
    //truncate email and password from body of request
        const { email, password} = req.body;
    // Connect to the SQL database
        const pool = await sql.connect(config);
    // Check if the user exists
        const userExistQuery = `SELECT * FROM [dbo].[user] WHERE email = @Email`;
        const userExistResult = await pool.request()
            .input('Email', sql.VarChar, email)
            .query(userExistQuery);
        console.log("TESSSSSSSSSSSSSST",userExistResult)
        if (userExistResult.recordset.length == 0) {
            return res.status(400).send("Email or password are invalid please verify your access credentials ...");
        }
        console.log("TEST PASSWORD",userExistResult.recordset[0].password)
        const match = await comparePassword(password,userExistResult.recordset[0].password)
        if (!match) return res.status(400).send("Wrong password! Please Try Again.")
    //create signed jwt 
        const token = jwt.sign({_id: userExistResult.recordset[0].user_id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        })
    //return user and token to client , exclude hashed password 
        userExistResult.password = undefined;
    // send user as json response 
    res.json({ token, user: userExistResult.recordset[0] });
    //return res.json({ ok: true });
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error.Try again.")
    }
}
async function logout(req,res){
    try {
        res.clearCookie("token")
        return res.json({message: "Signout successfull"})
    } catch (error) {
        console.log(error)
    }
}


module.exports = { register,login,logout,currentuser };
