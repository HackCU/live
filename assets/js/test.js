var pata = 'heading1,heading2,heading3,heading4,heading5 \n value1_1,value2_1,value3_1,value4_1,value5_1 \n value1_2,value2_2,value3_2,value4_2,value5_2 ';
var Data;


 fetch('https://cors.now.sh/https://docs.google.com/spreadsheets/d/11q-oAZkR5tWFhLOLNrjWf138O9MmoNMLbvmQpfHjFcE/export?format=csv')
.then(console.log)
.catch(console.error)
console.log(pata);
var lines = pata.split("\n"),
output = [],
i;
for (i = 0; i < lines.length; i++)
output.push("<tr><td>"
+ lines[i].slice(0,-1).split(",").join("</td><td>")
+ "</td></tr>");
output = "<table>" + output.join("") + "</table>";
var div = document.getElementById('scheduleTable');

div.innerHTML = output;