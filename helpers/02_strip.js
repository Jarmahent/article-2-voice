const striptags = require('striptags')
const fs = require('fs')
const path = require('path')

module.exports = function(article, outDir, exportMeta){
  return new Promise((resolve, reject) =>{
    if(exportMeta){
      let strippedTags = striptags(article.content)
      console.log("Stripping html entities and writing meta data...")
      article_file = {
        "url":article.url,
        "content":strippedTags,
        "title":article.title,
        "author":article.author,
        "published":article.published,
        "source": article.source,
        "image": article.image
      }
  
  
      fs.writeFile(path.join(outDir, "meta.json"), JSON.stringify(article_file), (err)=>{
        if(err){return reject(err)}
        return resolve(strippedTags)
      })
    }else{
      console.log("Stripping...")
      return resolve(striptags(article.content))
    }
  });
}