const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const sql = require('mssql');
const morgan = require("morgan");
require("dotenv").config();
const csrfProtection = csrf({cookie: true });

//create express app
const app = express();

//apply middlewares
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(express.json({limit: "5mb"}));
app.use(cookieParser());
app.use(morgan("dev"));

//route
readdirSync("./routes").map((r)=>app.use("/api",require(`./routes/${r}`)));
//csrf
app.use(csrfProtection);
app.get("/api/csrf-token", (req,res) => {
  res.json({csrfToken : req.csrfToken()});
});

// port 
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const config = {
  server: 'DESKTOP-8GVPJNN',
  database: 'finance',
  user: 'tunisair_express',
  password: 'jasser123',
  options: {
      trustServerCertificate: true
  }
};

sql.connect(config)
    .then(pool => {
        console.log('Connected to SQL Server');
        // return pool.request().query('SELECT * FROM log');
        return pool
    })
    .then(result => {
        // console.log(result);
    })
    .catch(err => {
        console.error('Error connecting to SQL Server', err);
    });
