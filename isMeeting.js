I use this with Obsidian to sift through markdown files and find the last occurrence of a meeting. 


```
function listFiles (mtg) {
	
	/**
	 * datedFilenames does not require an argument.
	 * datedFilenames returns "isDated" - an array of filenames whose names begin with a date.
	 */
	const fs = require('fs')
	const count = 0
	const dir = ('/Users/jrgarrigues/katchi_vault')
	const fileNames = fs.readdirSync(dir);
	const dateRegex = /^\d\d\d\d-\d\d-\d\d/;
	const isDated = fileNames.filter(startsWithDate);
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
	const isSpecific = fileNames.filter(specificMeeting);
	function specificMeeting(value) {
		if (meetingRegex.test(value) === true) {
			return value;
		}
	}
	const mostRecentDate = [];
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
		"\nMost recent date: "+latestDate);
	return "[["+latestDate+mtg.slice(0,-3)+"]]"

	
	// console.log(isSpecific[0]);


	
}
module.exports = listFiles;
```
