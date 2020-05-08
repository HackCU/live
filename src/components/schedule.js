import React from 'react';
import { css } from '@emotion/core';
import { Flex, Box, Text } from 'rebass';
import moment from 'moment';
import Dotdotdot from 'react-dotdotdot';

export default ({
  autoTime = false, // Calulates the best start and end time to fit every item
  startTime = 8, // TODO: change to 8
  endTime = 23,
  hourHeight = 200,
  events,
  openEvent
}) => {
  // TODO: remove events that have already pasted in time?
  const allEvents = events.flatMap((group) => group.events);
  const eventsInOrder = allEvents.sort((a, b) => {
    if (!!a.startTime && !!b.startTime) {
      const startDiff = a.startTime.diff(b.startTime);
      if (startDiff === 0 && !!a.endTime && !!b.endTime) {
        return a.endTime.diff(b.endTime);
      }
      return startDiff;
    }
    return 0;
  });
  const minTime = Math.floor(
    allEvents.reduce((min, event) => {
      if (
        !!event.startTime &&
        event.startTime.hours() * 60 + event.startTime.minutes() < min
      ) {
        return event.startTime.hours() * 60 + event.startTime.minutes();
      }
      return min;
    }, 24 * 60) / 60
  );
  const maxTime = Math.ceil(
    allEvents.reduce((max, event) => {
      if (
        !!event.endTime &&
        event.endTime.hours() * 60 + event.endTime.minutes() > max
      ) {
        return event.endTime.hours() * 60 + event.endTime.minutes();
      } else if (
        !!event.startTime &&
        event.startTime.hours() * 60 + event.startTime.minutes() + 60 > max
      ) {
        // if no end time but there is a startime account space for one hour (to fit the element at the end)
        return event.startTime.hours() * 60 + event.startTime.minutes() + 60;
      }
      return max;
    }, 0) / 60
  );

  const calStart = autoTime ? minTime : startTime;
  const calEnd = autoTime ? maxTime : endTime;
  const times = [];

  for (let i = calStart; i < calEnd; ++i) {
    times.push(`${i === 12 ? 12 : i % 12}:00${i < 12 ? 'AM' : 'PM'}`);
  }

  return (
    <Box>
      <Flex sx={{ position: 'relative' }}>
        {/* The hour lines */}
        <Flex flexDirection="column" width={0}>
          <Box height={hourHeight} />
          {times.map((time) => (
            <Box
              key={time}
              height={hourHeight}
              css={css`
                &:after {
                  content: '';
                  border-bottom: #dadce0 1px solid;
                  position: absolute;
                  width: 100%;
                  margin-left: 4px; // To hide some of it on the left side of the times
                  pointer-events: none;
                }
              `}
            />
          ))}
        </Flex>

        {/* The times */}
        <Flex
          flexDirection="column"
          mx={1}
          // cover over the timeline bar
          bg="background"
          sx={{ zIndex: 1 }}
          // move times near bar
          alignItems="flex-end"
        >
          {/* for title */}
          <Box height={hourHeight} />
          {times.map((time) => (
            <Box key={time} height={hourHeight}>
              <Text
                bg="background"
                // following options are to get the time right next to the bar
                textAlign="right"
                sx={{
                  position: 'relative',
                  top: '-12px',
                  right: '10px'
                }}
              >
                {time}
              </Text>
            </Box>
          ))}
        </Flex>

        {/* The tabs with entries */}
        {events.map(({ title, events: eventsAtLocation }, index, types) => {
          return (
            <Box
              key={title}
              width={1 / (types.length + 1)}
              alignItems="center"
              height={(times.length + 1) * hourHeight}
              mx={1}
              sx={{ position: 'relative' }}
            >
              {/* Title */}
              <Box height={hourHeight} textAlign="center">
                <Text sx={{ overflow: 'overlay' }}>
                  {!!title ? title : 'Misc.'}
                </Text>
              </Box>
              {/* Items */}
              {eventsAtLocation.map(
                ({ title: eventTitle, startTime, endTime }, index, list) => {
                  const top = !!startTime
                    ? (startTime.hours() +
                        startTime.minutes() / 60 -
                        calStart) *
                        hourHeight +
                      hourHeight
                    : hourHeight;
                  // todo: height is not correct for 30 minute events
                  const height =
                    !!startTime && !!endTime
                      ? moment.duration(endTime.diff(startTime)).asHours() *
                        hourHeight
                      : hourHeight;
                  return (
                    <Flex
                      key={eventTitle}
                      height={hourHeight}
                      textAlign="center"
                      color="textDark"
                      bg="primary"
                      flexDirection="column"
                      sx={{
                        borderRadius: '5px',
                        // Positioning
                        position: 'absolute',
                        top,
                        height,
                        left: 0,
                        right: 0
                      }}
                      onClick={() => openEvent(list[index])}
                    >
                      <Text height={height} sx={{ overflow: 'hidden' }}>
                        {/* multiline ellipsis */}
                        <Dotdotdot clamp="auto">{eventTitle}</Dotdotdot>
                      </Text>
                    </Flex>
                  );
                }
              )}
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
