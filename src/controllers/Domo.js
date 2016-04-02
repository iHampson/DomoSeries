var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;

var makerPage = (req,res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err,docs) => {
    if(err){
      console.log(err);
      return res.status(400).json({error: "Error finding Domo owners."});
    }
    res.render('app', {csrfToken: req.csrfToken(), domos: docs, some:true});
  });
};

var makeDomo = (req,res) => {
  //This should be seperate methods to check if the form is filled out then a method to make the domo
  if(!req.body.name || !req.body.age || !req.body.height){
    return res.status(400).json({error: "All fields are required."});
  }
  var domoData = {
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
    owner: req.session.account._id,
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

// var deleteDomo = (req, res) => {
//   console.log("delete hit.");
//   res.staus(200).send();//json({redirect: '/maker'});
//
//   Domo.DomoModel.find({
//     name: req.body.name,
//     owner: req.session.account._id,
//   },
//   (err, domo) => {
//     if(err){
//       console.log(err)
//       return res.status(400).json({error: "Error deleting the domo."});
//     }
//     else{
//       domo.remove();
//       res.json({redirect: '/maker'});
//     }
//   });
// };

var showAll = (req, res) => {
  Domo.DomoModel.findAll((err,docs) =>{
    if(err){
      console.log(err);
      return res.status(400).json({error: "Error finding Domos."});
    }
    res.render('app', {csrfToken: req.csrfToken(), domos: docs, some: false});
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
// module.exports.remove = deleteDomo;
module.exports.showAll = showAll;
