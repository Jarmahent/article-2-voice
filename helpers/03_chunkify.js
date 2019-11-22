module.exports = function(article){
  console.log("Chunking...")
  return new Promise((resolve, reject) =>{
    data = article.replace(/(\r\n|\n|\r)/gm, '');
    var chunks = [];
    var m;
    var re = /(.{1,4800})(\s+|$)/g;
    while (m = re.exec(data)) {
      chunks.push(m[1]);
    }
    return resolve(chunks)
  })
}