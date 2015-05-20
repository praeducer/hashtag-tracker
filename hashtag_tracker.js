/*
	A simple Node.js app to monitor a particular hashtag.

	@author: Paul Prae
	@since: 05/14/2015
*/

var Twitter = require('twitter');
var fs = require('fs');

var secret = JSON.parse(fs.readFileSync('secret.json', 'utf8'));
var client = new Twitter(secret);

var Tweet_Writer = require('./Tweet_Writer');
var tweet_writer = new Tweet_Writer();

client.stream('statuses/filter', {track: '#javascript'}, function(stream) {
  stream.on('data', function(tweet) {
    //console.log("@" + tweet.user.screen_name + ": " + tweet.text);
    tweet_writer.insert(tweet);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});
