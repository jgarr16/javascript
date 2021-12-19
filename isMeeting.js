// I use this with Obsidian to sift through markdown files and find the last occurrence of a meeting OR the number of meetings in a specific series. 


```
function listFiles (env,mtg,func) {
	/**
	 * getOS does not require an argument.
	 * getOS returns the operating system that the script is being run on.
	 */
	function getOS() {
		var userAgent = window.navigator.userAgent,
			platform = window.navigator.platform,
			macosPlatforms = ['Macintosh','MacIntel','MacPPC','Mac68K'],
			windowsPlatforms = ['Win32','Win64','Windows','WinCE'],
			iosPlatforms = ['iPhone','iPad','iPod'],
			os = null;

		if (macosPlatforms.indexOf(platform) !== -1) {
			os = 'M';
			// console.log('OS = Mac');
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			os = 'W';
			console.log('OS = Windows');
		} else {
			os = "N";
			console.log('unsupported OS');
		}
		// console.log('OS = '+os);
		return os;
	}

	/**
	 * datedFilenames does not require an argument.
	 * datedFilenames returns "isDated" - an array of filenames whose names begin with a date.
	 */
	const fs = require('fs')
	const count = 0
	var os = getOS();
	console.log("os = "+os);
	if (os === 'M') {
		var dir = (`/Users/jrgarrigues/katchi_${env}`);
	} else if (os === 'W') {
		var dir = ('C:\\Users\\jrgarrig\\AppData\\Roaming\\obsidian\\Obsidian Help')
	} else if (os === 'N') {
		var dir = ('')
		console.log("Sorry, this is an unsupported operating system.")
	}
	console.log(dir);
	const fileNames = fs.readdirSync(dir);
	const dateRegex = /^\d\d\d\d-\d\d-\d\d/;
	const isDated = fileNames.filter(startsWithDate);
	let mostRecentDate = [];
	/**
	 * The startsWithDate function tests individual filename strings to see if they begin with an ISO-formatted date (e.g., 2021-11-27).
	 *  
	 * @param {value} - strings representing filenames 
	 */
	function startsWithDate(value) {
		if (dateRegex.test(value) === true) {
			return value;
		}
	}
	const meetingRegex = new RegExp(`${mtg}`,"g");
	console.log(meetingRegex)
	const isSpecific = fileNames.filter(specificMeeting);
	function specificMeeting(value) {
		if (meetingRegex.test(value) === true) {
			return value;
		}
	}
	mostRecentDate = [];
	const iterator = isSpecific.values()
	for (const i of iterator) { 
		const dateString = i.slice(0,10);
		// console.log(dateString)
		const finalDate = new Date(dateString)
		// console.log(finalDate);
		// console.log(dateString)
		mostRecentDate.push(finalDate)
	}
	console.log(mostRecentDate)
	const max = new Date(Math.max.apply(null,mostRecentDate)).toISOString().slice(0,10);
	console.log("max: "+max);
	const ref = new Date().toISOString().slice(0,10);
	console.log("ref: "+ref);
	if (max >= ref) { mostRecentDate.pop(max); }
	console.log(mostRecentDate);
	const latestDate = new Date(Math.max.apply(null,mostRecentDate)).toISOString().slice(0,10);
	console.log(
		"Files: "+fileNames.length+
		"\nDated: "+isDated.length+
		"\nSpecific: "+isSpecific.length+
		"\nMost recent date: "+latestDate+
		"\nReturning [["+latestDate+mtg.slice(0,-3)+"]]"
		)
	if (func === "instances") {
		return isSpecific.length
	} else if (func === "latest") {
		return "[["+latestDate+mtg.slice(0,-3)+"]]";
	}
	

	
	// console.log(isSpecific[0]);


	
}
module.exports = listFiles;
```
