/**
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of tags between
 * multiple github profile pictures
 * 
 * Given an array of github handles, searchCommonTagsFromGitHubProfiles should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of tags for each avatar_url (requires authentication)
 *   5) find the intersection of the tags
 * 
 * Much of the heavy lifting has been done already in `lib/advancedChainingHelpers`,
 * you just have to wire everything up together! Once you pass this one, you'll
 * be a promise chaining master! Have fun!
 */

var Promise = require('bluebird');
var lib = require('../../lib/advancedChainingLib.js');

// We're using Clarifai's API to recognize different an image into a list of tags
// Visit the following url to sign up for a free account
//     https://developer.clarifai.com/accounts/login/?next=/applications/
// Then, create a new Application and pass your Client Id and Client Secret into the method below
lib.setImageTaggerCredentials('qLfQn-R4LwfEdKyCF271--GMYfJv8zzHemiKtqvD', 'Tl-C_1i0IiGgS0hDb7S5PZENdYMPH_LNdYIl2qU1');

var searchCommonTagsFromGitHubProfiles = function(githubHandles) {
  var prof;
  var promises = githubHandles.map(lib.getGitHubProfile);
  return Promise.all(promises)
  .then(function(profile) {
    prof = profile;
    return lib.authenticateImageTagger();
  })
  .then(function(token) {
    return lib.tagImage(prof.avatarUrl, token);
  })
  .then(function(params) {
    console.log(params);
  });
};

// Export these functions so we can unit test them
module.exports = {
  searchCommonTagsFromGitHubProfiles: searchCommonTagsFromGitHubProfiles
};
