var models = require('../models');

var Account = models.Account;

var loginPage = (req,res) => {
  res.render('login');
};

var signupPage = (req,res) => {
  res.render('signup');
};

var logout = (req,res) => {
  res.redirect('/');
};

var login = (req,res) => {

};

var signup = (req, res) => {

};

module.exports.loginPage = loginPage;
module.exports.signupPage = signupPage
module.exports.logout = logout;
module.exports.login = login;
module.exports.signup = signup;
