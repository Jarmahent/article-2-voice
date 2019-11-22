const textToSpeech = require('@google-cloud/text-to-speech');
module.exports = function(article){
  console.log("Converting...")
  return new Promise(async(resolve, reject) =>{
    const client = new textToSpeech.TextToSpeechClient({
      projectId: 'ttsapi-259817',
      keyFilename: './config.json',
    });

    var audioChunks = [];
    for (var index in article) {
      // Construct the request
      const request = {
        input: { text: article[index] },
        // Select the language and SSML Voice Gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
        // Select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
      };

      // Performs the Text-to-Speech request
      const [response] = await client.synthesizeSpeech(request);
      audioChunks.push(response.audioContent);
    }

    let buffer_chunks = Buffer.concat(audioChunks)
    // let base64_data = Buffer.from(buffer_chunks).toString('base64');
    // let base64_encoded = 'data:audio/mpeg;base64,' + base64_data;

    return resolve(buffer_chunks)
  })
}