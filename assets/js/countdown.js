---
# Frontmatter needed to take start and end time variables from _config.yml
---

var app = new Vue({
	el: '.countdown',
	data: {
	  hackingBegins:"{{ site.start_time | date_to_xmlschema }}",
	  hackingEnds: "{{ site.end_time  | date_to_xmlschema}}",
	  now: Math.trunc((new Date()).getTime() / 1000)
	},
	mounted() {
		window.setInterval(() => {
			this.now = Math.trunc((new Date()).getTime() / 1000);
		},1000);
	},
	filters: {
		twodigits: function(value) {
			if (value < 0) {
				return '00';
			}
			if (value.toString().length <= 1) {
				return `0${value}`;
			}
			return value;
		},
	},
	computed: {
		timeleft() {
			if (this.now < Math.trunc(Date.parse(this.hackingBegins) / 1000)){
				return Math.trunc(Date.parse(this.hackingEnds) / 1000) - Math.trunc(Date.parse(this.hackingBegins) / 1000);
			}
		  	return Math.trunc(Date.parse(this.hackingEnds) / 1000) - this.now;
		},
		seconds() {
		  	return Math.trunc(this.timeleft) % 60;
		},
		minutes() {
		  return Math.trunc((this.timeleft) / 60) % 60;
		},
		hours() {
		  return Math.trunc((this.timeleft) / 60 / 60);
		},
		
	}
  })