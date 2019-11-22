const {extract} = require('article-parser')
module.exports = function(article){
  console.log("Extracting...")
	return new Promise(function(resolve, reject) {
    extract(article)
    .then( article =>{
      return resolve(article);
    })
  });
}
