import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

function seconds(date) {
  return Math.trunc(date) % 60;
}

function minutes(date) {
  return Math.trunc(date / 60) % 60;
}

function hours(date) {
  return Math.trunc(date / 60 / 60);
}

function timeLeft(current, start, end) {
  if (current < Math.trunc(start / 1000)) {
    return Math.trunc(end / 1000) - Math.trunc(start / 1000);
  }
  return Math.trunc(end / 1000) - current;
}

function twoDigits(number) {
  const numStr = number.toString();
  if (number < 0) {
    return '00';
  } else if (numStr.length <= 1) {
    return `0${number}`;
  }
  return numStr;
}

export default () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          startingTime
          endingTime
        }
      }
    }
  `);
  const { startingTime, endingTime } = data.site.siteMetadata;
  const [time, setTime] = useState(Math.trunc(new Date().getTime() / 1000));
  useEffect(() => {
    // update time every second
    const timer = setInterval(() => {
      setTime(Math.trunc(new Date().getTime() / 1000));
    }, 1000);
    // remove interval when the timer component is unmounted
    return () => clearInterval(timer);
  }, []);

  const left = timeLeft(time, Date.parse(startingTime), Date.parse(endingTime));

  return (
    <>
      {twoDigits(hours(left))}:{twoDigits(minutes(left))}:
      {twoDigits(seconds(left))}
    </>
  );
};
