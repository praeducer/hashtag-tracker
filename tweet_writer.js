/*
	Writes Tweets to a collection on a local mongoDB server.

	@author: Paul Prae
	@since: 05/14/2015
*/

function Tweet_Writer() {

	var MongoClient = require('mongodb').MongoClient;
	var assert = require('assert')
	var ObjectId = require('mongodb').ObjectID;
	var url = 'mongodb://localhost:27017/test';

	var insertDocument = function(tweet, db, callback) {
	   db.collection('tweets').insertOne( tweet, function(err, result) {
	    assert.equal(err, null);
	    console.log("Inserted a tweet into the tweets collection.");
	    callback(result);
	  });
	};

	this.insert = function(tweet) {
		MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
			console.log("Connected correctly to server.");
		  insertDocument( tweet, db, function() {
		      db.close();
		  });
		});
	};
}

module.exports = Tweet_Writer;