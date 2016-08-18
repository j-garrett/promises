/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisify(require('request'));


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return fs.readFileAsync(readFilePath)
  .then(function(data) {
    return data.toString().split('\n')[0];
  }).then(function(username) {
    var options = {
      url: 'https://api.github.com/users/' + username,
      headers: { 'User-Agent': 'request' },
      json: true  // will JSON.parse(body) for us
    };
    return request(options)
    .then(function(profile) {
      // console.log(profile.body);
      return fs.writeFileAsync(writeFilePath, JSON.stringify(profile.body));
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
