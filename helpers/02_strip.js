const striptags = require('striptags')
const fs = require('fs')
const path = require('path')

module.exports = function(article, outDir, exportMeta){
  return new Promise((resolve, reject) =>{
    tags_strippped = striptags(article.content)

    if(exportMeta){
      console.log("Stripping html entities and writing meta data...")
      article_file = {
        "url":article.url,
        "content":tags_strippped,
        "title":article.title,
        "author":article.author,
        "published":article.published,
        "source": article.source
      }
  
  
      fs.writeFile(path.join(outDir, "meta.json"), JSON.stringify(article), (err)=>{
        if(err){return reject(err)}
        return resolve(striptags(tags_strippped))
      })
    }else{
      console.log("Stripping...")
      return resolve(striptags(tags_strippped))
    }
  });
}