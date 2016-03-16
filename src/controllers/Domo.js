var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;

var makerPage = (req,res) => {
  res.render('app');
};

var makeDomo = (req,res) => {
  if(!req.body.name || !req.body.age){
    return res.status(400).json({error: "Both name and age are required."});
  }
  console.log(req.session);
  var domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.cookie.account._id,
  };
  var newDomo = new Domo.DomoModel(domoData);

  newDomo.save(err => {
    if(err){
      console.log(err);
      res.status(400).json({error: "There is an error saving to the server"});
    }
    res.json({redirect: '/maker'});
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
