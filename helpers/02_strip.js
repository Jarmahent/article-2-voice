const striptags = require('striptags')
module.exports = function(article){
  console.log("Stripping...")
  return new Promise((resolve, reject) =>{
    return resolve(striptags(article.content))
  });
}