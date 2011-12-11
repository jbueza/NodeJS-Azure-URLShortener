var azure = require("azure")
  , url = require("../lib/url.js");


exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.insert = function(req, res) {
  

  res.write(req.body);

};

exports.search = function(req, res) {
  
};