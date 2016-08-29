var express = require('express');
var hbs = require('express-hbs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var path = require('path');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var viewsPath = path.join(__dirname, 'views');

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
	defaultLayout: viewsPath + '/layouts/main',
  	partialsDir  : viewsPath + '/partials',
	layoutsDir   : viewsPath + '/layouts',	
    extname      : '.hbs', //set extension to .hbs so handlebars knows what to look for
}));

hbs.registerHelper({
	eq: function (v1, v2) {
		return v1 === v2;
	},
	ne: function (v1, v2) {
		return v1 !== v2;
	},
	lt: function (v1, v2) {
		return v1 < v2;
	},
	gt: function (v1, v2) {
		return v1 > v2;
	},
	lte: function (v1, v2) {
		return v1 <= v2;
	},
	gte: function (v1, v2) {
		return v1 >= v2;
	},
	and: function (v1, v2) {
		return v1 && v2;
	},
	or: function (v1, v2) {
		return v1 || v2;
	}
});

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
