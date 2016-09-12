var express = require('express');
var router = express.Router();

var Bourne = require("bourne");
var users = new Bourne("users.json");

/* GET users listing. */
router.get('/', function(req, res, next) {
	var records = []
	users.find(function (err, out) {
		records = out;
    });
	// var recordsAsString = JSON.stringify(records)
	// console.log(recordsAsString);
	// res.send("records" + recordsAsString)
    res.render('users', {
		users: records
    });
});

router.post('/', function(req,res,next) { 
	var data = req.body
	
	var records = []
	users.find(function (err, out) { records = out })
	var max = Math.max.apply(Math,records.map(function(o){return o.id;}))
	data.id = ++max;
	
	users.insert(data, function(result) { 
		console.log("result: " + result)
	}); 
  	// res.send('respond with a resource');
	res.redirect(301, '/users')
});


router.post('/delete', function(req,res,next) { 
	var id = parseInt(req.body.id, 10)
	console.log("id : " + id)
    users.delete({ id: id }, function (err, records) {
    });

  	// res.send('respond with a resource');
	res.redirect(301, '/users')
});


module.exports = router;
