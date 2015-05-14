/*
	A simple Node.js app to monitor a particular hashtag.

	@author: Paul Prae
	@since: 05/14/2015
*/


var Twitter = require('twitter');
var fs = require('fs');

var secret = JSON.parse(fs.readFileSync('secret.json', 'utf8'));
var client = new Twitter(secret);

client.stream('statuses/filter', {track: '#javascript'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});
