var controllers = require('./controllers');
var mid = require('./middleware');

var router = app => {

  app.get('/login', mid.requireSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/signup', mid.requireSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.get('/', mid.requireSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/allDomos', mid.requiresLogin, controllers.Domo.showAll);

  app.post('/login', mid.requireSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requireSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  // app.post('/domoDelete', mid.requiresLogin, controllers.Domo.makerPage);
};

module.exports = router;
