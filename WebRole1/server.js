var express = require('express');
var azure = require("azure")
  , alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")
  , base = alphabet.length
  , uuid = require("node-uuid")
  , client = azure.createTableService()
  , tableName = "abcUrls";


var app = module.exports = express.createServer();

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes

app.get('/', function (request, response) {
  response.render('index', { title: 'Vancouver Azure  Group!' });
});
app.post('/api', function (request, response) {
  response.header("Content-Type", "application/json");
  url.insert(request, response);
});
app.get('/:hash', function (request, response) {
  if (request.params.hash != "favicon.ico") {

    url.redirect(request.params.hash, response);
  }
});

app.listen(process.env.port || 1337);

var url = function () { };
url.insert = function insert(request, response) {
  client.createTableIfNotExists(tableName, function (err) {

    //check if it exists, if it does exist, redirect
    url.search({ key: "url", value: request.body.url }, function (row) {
      if (row.url == "/") {
        var item = request.body.item || {};
        item.RowKey = uuid();
        item.PartitionKey = '1';
        item.url = request.body.url;
        item.hash = url.encode(new Date().getTime());

        client.insertEntity(tableName, item, function (error, result) {
          if (error) console.error(JSON.stringify(error));
          response.end(JSON.stringify({ Success: true, url: result.hash }));
        });
      } else {
        row.url = row.hash;
        response.end(JSON.stringify(row));
      }
    });

  });

};

url.search = function search(paramsObj, callback) {
  client.createTableIfNotExists(tableName, function (creationError) {
    if (creationError === null) {
      var query = azure.TableQuery
                        .select()
                        .from(tableName)
                        .where(paramsObj.key + ' eq ?', paramsObj.value);
      client.queryEntities(query, function (err, rows) {
        if (rows.length > 0) {
          callback.call(this, rows[0]);
        } else {
          callback.call(this, { url: "/" });
        }
      });
    } else {
      console.error(error.creationError);
    }
  });
};
url.redirect = function redirect(hash, response) {
  url.search({ key: "hash", value: hash }, function (row) {
    //add analytics here
    response.redirect(row.url);
  });
};

url.encode = function encode(id) {
  if (id == 0) return alphabet[0];
  var code = "";
  while (id > 0) {
    code += alphabet[id % base];
    id = parseInt(id / base, 10);
  }
  return code.split("").reverse().join("");
};

url.decode = function decode(code) {
  var i = 0;

  for (var index = 0, len = code.length; index < len; index++) {
    var character = code[index];
    i = i * base + alphabet.indexOf(character);
  }
  return i;
};

