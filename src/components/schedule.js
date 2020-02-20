import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { breakpoints, breakpointsConfig } from '../util/breakpoints';
import Media from 'react-media';

const ScheduleContainer = styled.div`
  position: relative;
  margin: 2em 0;

  ${breakpoints.small} {
    margin: 2em auto;
    width: 100%;
    // max-width: 1500px;

    &:after {
      clear: both;
      content: '';
      display: block;
    }
  }
`;

const Timeline = styled.div`
  display: none;

  ${breakpoints.small} {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding-top: 50px;
  }
`;

const TimelineTime = styled.li`
  ${breakpoints.small} {
    position: relative;
    // HEIGHT IS DEFINED BY PROGRAM
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: #eaeaea;
    }

    &:last-of-type:after {
      display: none;
    }

    & span {
      display: none;
    }
  }

  ${breakpoints.regular} {
    &:after {
      width: calc(100% - 60px);
      left: 60px;
    }
    span {
      display: inline-block;
      transform: translateY(-50%);
    }
    &:nth-of-type(2n) span {
      display: none;
    }
  }
`;

const Events = styled.div`
  position: relative;
  z-index: 1;

  ${breakpoints.small} {
    float: left;
    width: 100%;
  }

  ${breakpoints.regular} {
    /* 60px is the .timeline element width */
    width: calc(100% - 60px);
    margin-left: 60px;
  }
`;

const UlEvents = styled.ul`
  ${breakpoints.small} {
    display: flex;
  }
`;

const EventGroup = styled.li`
  margin-bottom: 0px;

  & > ul {
    position: relative;
    padding: 0 5%;
    /* force its children to stay on one line */
    display: flex;
    flex-direction: column;
  }

  ${breakpoints.small} {
    width: 20%;
    float: left;
    border: 0px solid #eaeaea;
    /* reset style */
    margin-bottom: 0;
    margin: auto;

    & > ul {
      height: 900px;
      /* reset style */
      display: block;
      overflow: visible;
      padding: 0;
    }
  }
`;

const EventInfo = styled.div`
  & > span {
    display: inline-block;
    line-height: 1.2;
    // margin-bottom: 10px;
    font-weight: bold;
    padding: 10px;
  }

  ${breakpoints.small} {
    & > span {
      margin: 0 auto;
      display: table;
      height: 50px;
      border-bottom: 1px solid #eaeaea;
      /* reset style */
      padding: 0;
    }
  }
`;

const VerticalAlign = ({ children }) => (
  <div
    css={css`
      display: flex;
      height: 100%;
    `}
  >
    <div
      css={css`
        margin: auto;
        cursor: pointer;
      `}
    >
      {children}
    </div>
  </div>
);

const Event = ({ startPos, height, item, onClick, index }) => (
  <li
    css={theme => css`
      flex-shrink: 0;
      height: 150px;
      width: 100%;
      // max-width: 300px;
      box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.2);
      margin-right: 20px;
      transition: opacity 0.2s, background 0.2s;
      background-color: ${index % 2 === 0
        ? theme.colors.secondary
        : theme.colors.tertiary};
      color: ${theme.colors.text};
      margin: 5px auto;
      cursor: pointer;
      border-radius: 5px;

      ${breakpoints.small} {
        position: absolute;
        z-index: 3;
        width: calc(100% + 20px);
        left: -1px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1),
          inset 0 -3px 0 rgba(0, 0, 0, 0.2);
        /* reset style */
        flex-shrink: 1;
        max-width: none;
        margin: 0;
        top: ${startPos}px;
        height: ${height}px;
      }
    `}
    onClick={onClick}
  >
    <VerticalAlign>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          text-align: center;
        `}
      >
        <span
          css={css`
            font-size: 0.85rem;
            margin: 0 auto;
          `}
        >
          {item.start} - {item.end}
        </span>
        <div
          css={css`
            ${breakpoints.small} {
              font-size: 1.3rem;
              font-weight: 500;
              margin: 0 auto;
            }
          `}
        >
          {item.title}
        </div>
      </div>
    </VerticalAlign>
  </li>
);

export default ({
  autoTime = false, // Calulates the best start and end time to fit every item
  startTime = 8, // TODO: change to 8
  endTime = 23,
  hourHeight = 200,
  groups,
  openEvent
}) => {
  // TODO: remove events that have already pasted in time?
  const allEvents = groups.flatMap(group => group.events);
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
  const timeline = [];

  for (let i = 0; i < (calEnd - calStart) * 2; ++i) {
    const tweleveHourTime = i / 2 + calStart;
    timeline.push(
      <TimelineTime
        css={css`
          height: ${hourHeight / 2}px;
        `}
      >
        <span>
          {i % 2 === 0 &&
            `${tweleveHourTime === 12 ? 12 : tweleveHourTime % 12}:00${
              tweleveHourTime < 12 ? 'AM' : 'PM'
            }`}
        </span>
      </TimelineTime>
    );
  }

  const createEvents = events =>
    events.map((event, index) => {
      const startPos = !!event.startTime
        ? (event.startTime.hours() -
            calStart +
            event.startTime.minutes() / 60) *
          hourHeight
        : 0;
      const height =
        !!event.startTime && !!event.endTime
          ? (event.endTime.hours() -
              event.startTime.hours() +
              (event.endTime.minutes() - event.startTime.minutes()) / 60) *
            hourHeight
          : hourHeight / 2;
      return (
        <Event
          key={event.title}
          index={index}
          startPos={startPos}
          height={height}
          onClick={openEvent(event)}
          item={event}
        />
      );
    });

  return (
    <Media
      queries={{
        desktop: `(min-width: ${breakpointsConfig.small}px)`
      }}
    >
      {matches => (
        <>
          {!matches.desktop && <ul>{createEvents(eventsInOrder)}</ul>}
          {matches.desktop && (
            <ScheduleContainer
              css={css`
                ${breakpoints.small} {
                  height: ${(calEnd - calStart) * 2 * (hourHeight / 2) +
                    hourHeight / 4}px;
                }
              `}
            >
              <Timeline>
                <ul>{timeline}</ul>
              </Timeline>
              <Events>
                <div
                  css={css`
                    display: relative;
                    height: 100%;
                  `}
                >
                  <UlEvents>
                    {groups.map(group => (
                      <EventGroup>
                        <EventInfo>
                          <span>{!!group.title ? group.title : 'Misc.'}</span>
                        </EventInfo>
                        <ul>{createEvents(group.events)}</ul>
                      </EventGroup>
                    ))}
                  </UlEvents>
                </div>
              </Events>
            </ScheduleContainer>
          )}
        </>
      )}
    </Media>
  );
};
