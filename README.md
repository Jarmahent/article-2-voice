# Article-2-Voice

A command line tool that uses the Google text-to-speech api to convert an article from url to an mp3 audio file.

-------


### How to Install:

1. `npm install article-2-voice`
 
Boom thats it.

------
### How to use:

Prerequisites:
- Create a google text to speech project, get your project id and get your text-to-speech json credentials

 
Parameters to use when running Article-2-voice

`-u` or `--url` The url of the article you want to convert <br>
`-c` or `--config` Where the json config file from google when your create your text-to-speech project is<br>
`-o` or `--output` where the output mp3 file will go when the article is converted<br>
`-i` or `--id` the project id from Google API<br>

---
Example of what it should look like in practice:

`a2v -c ./config.json -u "https://www.bleepingcomputer.com/news/security/severe-flaws-in-kubernetes-expose-all-servers-to-dos-attacks/" -o /Users/kevinhernandez/Desktop/out.m
p3 -i ttsapi-259817`

Output log:
```
Extracting...
Stripping...
Chunking...
Converting...
Writing...
```
