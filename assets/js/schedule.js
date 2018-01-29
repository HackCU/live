((window) => {
  function getNow() { 

    return moment();
  };

  // JSON DATA
  let schedule = [
    {
      date: moment("2018-02-24"),
      agenda: [
        {range: ['00:30', '08:59'], display: {h:8, m:30, a: 'am'}, location: 'Underscore Coffee Bar', desc: 'Breakfast Club Donuts + Coffee'},
        {range: ['09:00', '09:29'], display: {h:9, m:'', a: 'am'}, location: 'Solaris Terminal', desc: 'Registration + Team Check-in'},
        {range: ['09:00', '09:59'], display: {h:9, m:'', a: 'am'}, location: 'Underscore Coffee Bar', desc: 'Opening Remarks + Keynote'},
        {range: ['10:00', '11:59'], display: {h:10, m:'', a: 'am'}, location: '', desc: 'Hacking Session 1'},
        {range: ['12:00', '12:29'], display: {h:'Noon', m:'', a: '-ish'}, location: 'Atomic Lunch Pad', desc: 'LUNCH: Taco Tuesday!'},
        {range: ['12:30', '17:59'], display: {h:12, m:30, a: 'pm'}, location: '', desc: 'Hacking Session 2'},
        {range: ['18:00', '21:15'], display: {h:6, m:'', a: 'pm'}, location: 'Hackers Bar & Grill <br /><small>@ Second and Main</small>', desc: 'Welcome Reception + Dinner!'}
      ]
    },
    {
      date: moment("2018-02-25"),
      agenda: [
        {range: ['00:30', '08:59'], display: {h:8, m:30, a: 'am'}, location: 'Underscore Coffee Bar', desc: 'Breakfast Club Donuts + Coffee'},
        {range: ['09:00', '09:29'], display: {h:9, m:'', a: 'am'}, location: 'Solaris Terminal', desc: 'Registration + Team Check-in'},
        {range: ['09:30', '09:59'], display: {h:9, m:30, a: 'am'}, location: 'Underscore Coffee Bar', desc: 'Opening Remarks + Keynote'},
        {range: ['10:00', '11:59'], display: {h:10, m:'', a: 'am'}, location: '', desc: 'Hacking Session 1'},
        {range: ['12:00', '12:29'], display: {h:'Noon', m:'', a: '-ish'}, location: 'Atomic Lunch Pad', desc: 'LUNCH: Taco Tuesday!'},
        {range: ['12:30', '17:59'], display: {h:12, m:30, a: 'pm'}, location: '', desc: 'Hacking Session 2'},
        {range: ['18:00', '21:15'], display: {h:6, m:'', a: 'pm'}, location: 'Hackers Bar & Grill <br /><small>@ Second and Main</small>', desc: 'Welcome Reception + Dinner!'}
      ]
    }
  ]

  let app = new Vue({
    el: 'aside',
    data: {
      now: getNow(),
      time: getNow().format('h:mm a'),
    }
  })

  let sked = new Vue({
    el: 'main',
    filters: {
      date: function(date) {
        return date.format('ddd, MMM D');
      }
    },
    data: {
      now: getNow(),
      schedule: schedule
    },
    methods: {
      checkTime: function(ts, te, m_d) {
        let d = m_d.format('YYYY-MM-DD');
        let start = moment(d+' '+ts);
        let end = moment(d+' '+te);
        return (this.now.isSameOrAfter(start) && this.now.isSameOrBefore(end))
      }
    }
  })

  let setScroll = () => {
    setTimeout(() => {
      let anchor = document.querySelector('.current')
      let t = 0;
      if(anchor) {
        t = Math.round(anchor.getBoundingClientRect().top);
      }
      document.querySelector('main').scrollBy({top: t, left: 0, behavior: 'smooth' });
    }, 350)
  }
  
  let setTime = function() {
    let now = getNow();
    app.now = sked.now = now;
    app.time = now.format('h:mm a')
  }

  let runTimer = () => {
    console.log("update time");
    setTime();
    setScroll();
  }

  setInterval(runTimer,60000/2);


  // resize capture
  let resizeTimer;
  window.addEventListener('resize', (e) => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setScroll()
    }, 60);
  }, false)
  
})(window)