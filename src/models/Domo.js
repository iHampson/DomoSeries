var mongoose = require('mongoose');
var _ = require('underscore');

var DomoModel;

var setName = name => {
  return _.escape(name).trim();
};

var DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  height: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.methods.toAPI = () => {
  return {
    name: this.name,
    age: this.age,
    height: this.height,
  };
};

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  var search ={
    owner: mongoose.Types.ObjectId(ownerId)
  };

  return DomoModel.find(search).select("name age height").exec(callback);
};

DomoSchema.statics.findAll = (callback) => {
  return DomoModel.find().select("name age height").exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
