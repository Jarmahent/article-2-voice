const program = require('commander');
const npm = require('./package.json');

const extract = require('./helpers/01_extract');
const strip = require('./helpers/02_strip');
const chunkify = require('./helpers/03_chunkify');
const convert = require('./helpers/04_convert');
const write = require('./helpers/05_write');


program
	.version(npm.version)
	.option('-u, --url <url>', 'url to convert')
	.option('-c, --config <config>', 'Config file location')
	.option('-o, --output <output>', 'out mp3 location')
	.option('-i, --id <id>', 'Name of your projects id ex: myproj-190928');

program.parse(process.argv)

if(!program.url)
{
	console.info('\n');
	console.info('\tNo URL Provided');
	console.info('\n');

	process.exit(-1);
}
else if(!program.config)
{
	console.info('\n');
	console.info('\tNo config provided');
	console.info('\n');

	process.exit(-1);
}
else if(!program.output)
{
	console.info('\n');
	console.info('\tNo output provided');
	console.info('\n');

	process.exit(-1);
}
else if(!program.id)
{
	console.info('\n');
	console.info('\tNo projectId provided');
	console.info('\n');

	process.exit(-1);
}


main();

function main(){
	let config = program.config;
	let article = program.url;
	let output = program.output;
	let projectId = program.projectId;

	extract(article)
	.then(function(article) {

		return strip(article);

	}).then(function(article) {

		return chunkify(article);

	}).then(function(article) {

		return convert(article, config, projectId);

	}).then(function(article) {

		return write(article, output);

	})
	.catch(err =>{
		console.log("ERR")
		console.log(err)
	})
}