const request = require('superagent');
const textToSpeech = require('@google-cloud/text-to-speech');
const striptags = require('striptags');
const {extract} = require('article-parser')

module.exports = {
  friendlyName: 'Convert Article to speech',

  description: 'Convert the Article of the provided url to speech.',
  inputs:{},
  exits: {
    success: {
      responseType: 'ok'
    },
    invalidUrl: {
      description: 'Extractor failed to extract the provided url.',
      responseType: 'notFound'
    },
    processingError: {
      description: 'There was an error processing your request.',
      responseType: 'processingError'
    }
  },

  fn: async function (inputs, exits) {
    // Check if the provided URl already exists
    Article.find()
    .where({
      'article_url': this.req.body.url
    })
    .exec((err, response) =>{
      if(err){
        throw err;
      }
      // If no matching Article urls were found then continue
      if(response.length === 0){
        extract(this.req.body.url)
        .then(async article =>{
          let stripped_article = striptags(article.content);
          // Creates a client
          const client = new textToSpeech.TextToSpeechClient({
            projectId: 'ttsapi-259817',
            keyFilename: './config.json',
          });

          try{
            // Chunk the article into 4000 char chunks
            sails.log.debug("Attempting to chunkify data")
            var chunks = await sails.helpers.chunk.chunkify(stripped_article);
            var audioChunks = [];

            for (var index in chunks) {
              sails.log.debug("On Chunk")
              // Construct the request
              const request = {
                input: { text: chunks[index] },
                // Select the language and SSML Voice Gender (optional)
                voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
                // Select the type of audio encoding
                audioConfig: { audioEncoding: 'MP3' },
              };

              // Performs the Text-to-Speech request
              const [response] = await client.synthesizeSpeech(request);
              audioChunks.push(response.audioContent);
            }
            sails.log.debug("Joining and Encoding chunks")

            let buffer_chunks = Buffer.concat(audioChunks)
            let base64_data = Buffer.from(buffer_chunks).toString('base64');
            let base64_encoded = 'data:audio/mpeg;base64,' + base64_data;

            // Create a new
            sails.log.debug("Creating new article in database")
            await Article.create({
              'article_title': article.title,
              'article_body': stripped_article,
              'article_url': this.req.body.url,
              'article_image': article.image
            })
            .fetch()
            .exec(async(err, newRecord) =>{
              if(err){
                throw err;
              }
              await ArticleMedia.create({
                media: base64_encoded,
                owner: newRecord.id
              })
              .exec((err) =>{
                if(err){throw err}
                sails.log.debug("Success")
                return exits.success({
                  'article_title': article.title,
                  'article_body': stripped_article,
                  'article_url': this.req.body.url,
                  'article_audio': base64_encoded,
                  'article_image': article.image
                });
              })
            });
          }catch(error){
            sails.log.debug('Mid Level Error')
            throw error;
          }
        })
        .catch(err =>{
          if(err){throw err}
        })
      }else{
        response[0].exists = true;
        return exits.success(response[0]);
      }
    });
  }
};
