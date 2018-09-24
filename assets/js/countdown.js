---
# Frontmatter needed to take start and end time variables from _config.yml
---

// Countdown Timer

// Calculate remaining time
function getTimeRemaining(startTime, endTime) {

	let today = new Date();

	// Before hackathon
	if (Date.parse(today) < Date.parse(startTime)) {
		return {
		'total': 0,
		'days': 0,
		'hours': 24,
		'minutes': 0,
		'seconds': 0
		};
	}

	// After hackathon
	if (Date.parse(today) > Date.parse(endTime)) {
		return {
		'total': 0,
		'days': 0,
		'hours': 0,
		'minutes': 0,
		'seconds': 0
		};
	}

	// During hackathon
	let t = Date.parse(endTime) - Date.parse(today);
	let seconds = Math.floor( (t/1000) % 60 );
	let minutes = Math.floor( (t/1000/60) % 60 );
	let hours = Math.floor( (t/(1000*60*60)) % 24 );
	let days = Math.floor( t/(1000*60*60*24) );
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
} // end of calculating remaining time


// Initialize and update clock during event
function initializeClock(id, startTime, endTime) {

	let clock = document.getElementById(id);
	let hours = clock.querySelector('#hours');
	let minutes = clock.querySelector('#minutes');
	let seconds = clock.querySelector('#seconds');

	// Update clock every second
	let remainingTime = setInterval(function() {
		let time = getTimeRemaining(startTime, endTime);
		hours.innerHTML = ('0' + time.hours).slice(-2);
		minutes.innerHTML = ('0' + time.minutes).slice(-2);
		seconds.innerHTML = ('0' + time.seconds).slice(-2);
		
		//stop updating once time remaining becomes 0
		if (time.total <= 0) {
		clearInterval(remainingTime);
		}
	}, 1000); // end of updating clock
	
} // end of setting up clock

window.onload = function() {
	let hackingBegins = "{{ site.start_time }}";
	let hackingEnds = "{{ site.end_time }}";
	initializeClock('countdown-timer', hackingBegins, hackingEnds);
	initializeClock('countdown-timer-mobile', hackingBegins, hackingEnds);
};