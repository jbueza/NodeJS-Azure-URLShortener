var express = require('express');
//var url = require("./lib/url.js");

var azure     = require("azure")
  , uuid      = require("node-uuid")
  , client    = azure.createTableService()
  , tableName = "abcUrls";


var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes

app.get('/', function(request, response) {
	response.render('index', { title: 'Vancouver Azure Meetup Group!' });
});
app.post('/api', function(request, response) {
  url.insert(request, response);
});
app.get('/:hash', function(request, response) {
  
});

app.listen(process.env.port || 1337);


var url = function() {};
url.insert = function insert(request, response) {
   client.createTableIfNotExists(tableName, function(err) {
    var item = request.body.item || {};
    console.error(request.body);
    item.RowKey = uuid();
    item.PartitionKey = '1';
    item.DateCreated = new Date().getTime();
    item.url = request.body.url;

    client.insertEntity(tableName, item, function (error) {
      if(error) console.error(JSON.stringify(error)); 
      response.end(JSON.stringify({Success: true}));
    });    
   });

};

url.search = function search(request, response) {
  
};


