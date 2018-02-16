// Javascript code for pulling live updates from the schedule
// HackCU
// Released under MIT license (2018)
//


// URLs for google sheet and CORS
var scheduleUrl = "https://docs.google.com/spreadsheets/d/1MkLve58YjYuJdRrmG8-7rpTCaa7v9mspzmMninApx5g";
var corsUrl = "http://cors-proxy.htmldriven.com/?url=" + scheduleUrl + "/export?format=csv";

liveSchedule = function() {
	// Get data from CORS
	var urlData = jQuery.getJSON(corsUrl);

	// Wait 3 seconds to retrieve all data
	// Then update table
	setTimeout(function() {
		if (urlData.responseJSON == undefined) {
			console.log("Data not yet received.");
			return;
		}
		var rawData = urlData.responseJSON.body;
		var timetable = updateTable(rawData);
	}, 3000);
}

// Poll for updates every 10 seconds
setInterval(liveSchedule, 10000);

updateTable = function(jsonData) {
	var lines = jsonData.split("\n")
	var agenda = [];
	var output = [];

	for (var i = 0; i < lines.length; i++) {
	
		var contents = lines[i].split(",");
		output.push("<tr><td>" + contents.join("</td><td>") + "</td></tr>");

		// creates a JSON object after some parsing
		if (i != 0) {
			var item = {};
			item.startTime = contents[0].split(" ")[0];
			item.startMeridiem = contents[0].split(" ")[1];
			item.endTime = contents[1].split(" ")[0];
			item.endMeridiem = contents[1].split(" ")[1];
			item.event = contents[2];
			item.location = contents[3];
			agenda.push(item);
		}
	}

	// update the table
	var div = document.getElementById('scheduleTable');
	output = "<table>" + output.join("") + "</table>";
	div.innerHTML = output;

	return agenda;
}