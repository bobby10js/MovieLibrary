var express  = require("express");
var request  = require("request");
var bodyParser = require("body-parser");



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieDb', {useNewUrlParser: true, useUnifiedTopology: true});

const Movie = mongoose.model('movieCollections', {
	title: String,
	year: String,
	genre: String,
	poster: String,
	default: ''
	});




var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
	
		res.render("home.ejs");

		});

app.get("/results",function(req,res){
	var query = req.query.search;
	var genre = req.query.genre;
	var url ="http://www.omdbapi.com/?s="+query+"&type="+genre+ "&apikey=thewdb";
	console.log(url);
		request(url,function(error,response,body){
			if(!error && response.statusCode == 200){
				var parsedData = JSON.parse(body);
				res.render("result.ejs",{data : parsedData});
						   
			}
		});		
});

app.post("/addfriend",function(req,res){
	
		console.log(req.body);
	new Movie(req.body).save(function(err,result){
		console.log(err+ result);
	});
		 res.send("dsf");

		 })


app.get("*",function(req,res){
		res.send("Web Page not found");
		});

app.listen(3001, ()=>{
	console.log("server started");
});

