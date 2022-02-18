#!/usr/bin/node


let http = require("http");

let mongo_client = require("mongodb").MongoClient;

let url = "mongodb://localhost/";

let db;

console.log("Iniciando script mongo-http");

mongo_client.connect(url, function(error, conn){

	console.log("Dentro de MongoDB");

	if (error){
		console.log("ERROR!");
		return;
	}
	
	db = conn.db("tffhd");

});



http.createServer(function(req, res){
	res.writeHead(200);
	
	if (req.url == "/"){
		res.end();

		return;
	}

	let col = "";

	if(req.url == "/characters"){
		col = "characters";
	}
	else if(req.url == "/items"){
		col = "items";
	}
	else if(req.url == "/weapons"){
		col = "weapons";
	}
	else{
		return;
	}


	let col_data = db.collection(col).find();
	
	col_data.toArray(function(err, data){
		console.log(data);

		let string = JSON.stringify(data);

		res.end(string);
	});

}).listen(1095);








