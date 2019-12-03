const fs = require('fs')
const path = require('path')

module.exports = function(article, outDir){
  console.log("Writing...")
  return new Promise((resolve, reject) =>{
    fs.writeFile(path.join(outDir, "article.mp3"), article, 'binary', (err)=>{
      if(err){return reject(err)}
      console.log("Done!")
      return resolve(true)
    })
  })
}