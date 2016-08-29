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
	var recordsAsString = JSON.stringify(records)
	console.log(recordsAsString);
	// res.send("records" + recordsAsString)
    res.render('users', {
		users: records
    });
});

router.post('/', function(req,res,next) { 
	var data = 

	users.insert(data, function(result) { 
		res.json(result)
	}); 
  // res.send('respond with a resource');
});


module.exports = router;
