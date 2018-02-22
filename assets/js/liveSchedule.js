// Javascript code for pulling live updates from the schedule
// HackCU
// Released under MIT license (2018)
//


// URLs for google sheet and CORS
var scheduleUrl = "https://docs.google.com/spreadsheets/d/1MkLve58YjYuJdRrmG8-7rpTCaa7v9mspzmMninApx5g";
// var corsUrl = "http://cors-proxy.htmldriven.com/?url=" + scheduleUrl + "/export?format=csv";
var corsUrl = "https://cors-anywhere.herokuapp.com/" + scheduleUrl + "/export?format=csv";



updateTable = function(jsonData) {
	var days = jsonData.split("Day 2");
	for (var i = 0; i < days.length; i++) {
		var lines = days[i].split("\n")
		var agenda = [];
		var output = [];
		var first_line = true;
		for (var j = 0; j < lines.length; j++) {
			
			if (lines[j][0] == ",") {
				continue;
			}
			var contents = lines[j].split(",");
			if (first_line){
				output.push('<thead>')
			}
			output.push("<tr><td>" + contents.join("</td><td>") + "</td></tr>");
			if (first_line){
				output.push('</thead><tbody>');
				first_line = false;
			}

		}
		output.push('</tbody>')

		// update the table
		var div = document.getElementById('scheduleTable' + i);
		output = "<table class=\"highlight responsive-table\">" + output.join("") + "</table>";

		div.innerHTML = output;
	}

	return agenda;
}

liveSchedule = function() {
	// Get data from CORS
	$.get(corsUrl, function(data) {
		// var timetable = updateTable(data.body);
		var timetable = updateTable(data);
		console.log("Schedule updated!")
	});
}

$(function() {
	if (document.getElementById('scheduleTable0') !== null) {
		liveSchedule();
		setInterval(liveSchedule, 1000 * 60 * 2);
		// Poll for updates every 2 mins
	}
});


