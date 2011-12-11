var express = require('express')
  , routes = require('./routes')

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

app.get('/', routes.index);
app.post('/', routes.insert);
app.get('/:hash', routes.search);

app.listen(process.env.port);