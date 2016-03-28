var requiresLogin = (req, res, next) => {
  req.session.account ? next() : return res.redirect('/');
};

var requiresLogout = (req, res, next) => {
  req.session.account ? return res.redirect('/maker') : next();
};

var requireSecure = (req, res, next) => {
  var checkHead = req.headers['x-forwarded-proto'] != 'https';
  checkHead ? return res.redirect(`https://${req.hostname}${req.url}`) : next();
};

var bypassSecure = (req, res, next) => {
  next();
}

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

var checkProduction = process.env.NODE_ENV === "production";
module.exports.requireSecure =  checkProduction ? requireSecure: bypassSecure;
