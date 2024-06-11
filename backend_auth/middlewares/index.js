var { expressjwt : jwt} = require("express-jwt");
const dotenv = require('dotenv'); // Make sure to require dotenv for handling environment variables

// Load environment variables
dotenv.config();

// Middleware to protect routes
const requireSignin = jwt({
  getToken: (req,res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = {
  requireSignin
};
