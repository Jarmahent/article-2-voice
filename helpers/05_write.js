const fs = require('fs')
module.exports = function(article, outDir){
  console.log("Writing...")
  return new Promise((resolve, reject) =>{
    fs.writeFile(outDir, article, 'binary', (err)=>{
      if(err){return reject(err)}
      return resolve(true)
    })
  })
}