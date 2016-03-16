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
  if(!req.body.username || !req.body.pass || !req.body.pass2)
    return res.status(400).json({error: "All fields are required."});

  if(req.body.pass !== req.body.pass2)
    return res.status(400).json({error: "Passwords are not the same."});

  Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    var accountData = {
      username: req.body.username,
      salt: salt,
      password: hash,
    }

    var newAccount = new Account.AccountModel(accountData);

    newAccount.save(err => {
      if(err){
        console.log(err);
        return res.status(400).json({error: "There was an error."});
      }

      res.json({redirect: '/maker'});
    });

  });
};

module.exports.loginPage = loginPage;
module.exports.signupPage = signupPage
module.exports.logout = logout;
module.exports.login = login;
module.exports.signup = signup;
