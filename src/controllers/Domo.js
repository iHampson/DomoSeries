var _ = require('underscore');
var models = require('../models');

var makerPage = (req,res) => {
  res.render('app');
}

module.exports.makerPage = makerPage;
