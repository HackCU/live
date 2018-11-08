
var app = new Vue({
    el: '#app',
    data: {
        events: [
            { description: 'Learn JavaScript', start:"10:30", end:"11:30", location:"HERE"},
            { description: 'Learn JavaScript', start:"10:30", end:"11:30", location:"HERE"},
            { description: 'Learn JavaScript', start:"10:30", end:"11:30", location:"HERE"},
        ]
    }
})


// URLs for google sheet and CORS
var scheduleUrl = "https://docs.google.com/spreadsheets/d/1MkLve58YjYuJdRrmG8-7rpTCaa7v9mspzmMninApx5g";
// var corsUrl = "http://cors-proxy.htmldriven.com/?url=" + scheduleUrl + "/export?format=csv";
var corsUrl = "https://cors-anywhere.herokuapp.com/" + scheduleUrl + "/export?format=csv";

function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].toLowerCase().replace("\r","").split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
    
    //return result; //JavaScript object
    return result; //JSON
  }



$.get(corsUrl, function(data) {
    // var timetable = updateTable(data.body);
    data = csvJSON(data);
    console.log(data)
    app.events = data;
});