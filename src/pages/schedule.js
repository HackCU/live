import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '../components/layout';
import { css } from '@emotion/core';
import ScheduleCalendar from '../components/schedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Portal from '../components/portal';
import { Dropdown, Button } from 'react-materialize';

const VerticalAlign = ({ css: customCss, children }) => (
  <div
    css={css`
      display: flex;
      height: 100%;
    `}
  >
    <div
      css={css`
        ${customCss}
        margin: auto;
        cursor: pointer;
      `}
    >
      {children}
    </div>
  </div>
);

// TODO:
const ScheduleModal = ({
  title,
  startTime,
  endTime,
  children,
  onClose,
  open = false
}) => (
  <Portal>
    <div
      css={css`
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 3;
        visibility: ${open ? 'visible' : 'hidden'};
        transform: translateX(100%);
        transition: transform 0.4s, visibility 0.4s;

        &.open {
          transform: translateX(0);
        }
      `}
      className={open ? 'open' : ''}
    >
      <div
        css={theme => css`
          background-color: ${theme.colors.secondary};
          padding: 2.6em 5%;
          // padding-top: 20px;
          font-style: normal;
          font-size: 30px;
          color: ${theme.colors.text};
          display: flex;
        `}
      >
        <div>
          <h3>{title}</h3>
          <span
            css={css`
              font-size: 20px;
            `}
          >
            {startTime} - {endTime}
          </span>
        </div>
        {/* TODO: icon */}
        {/* Spacing */}
        <div
          css={css`
            flex-grow: 1;
          `}
        />
        <VerticalAlign>
          <FontAwesomeIcon icon={faTimes} onClick={onClose} />
        </VerticalAlign>
      </div>
      <div
        css={css`
          background-color: #fff;
          height: 100%;
          padding: 1.4em 5%;
        `}
      >
        {children}
      </div>
    </div>
  </Portal>
);

const placeholderEvent = {
  title: 'Loading...',
  start: '1:00 PM',
  end: '3:00 PM',
  startPos: 0,
  height: 100,
  description: 'Loading event description...'
};

export default () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState({
    day1: [
      {
        title: 'Idea Forge',
        events: [
          {
            title: 'Loading 1...',
            start: '1:00 PM',
            end: '3:00 PM',
            description: 'Free',
            location: 'Idea Forge'
          },
          {
            title: 'Loading 2...',
            start: '9:00 AM',
            end: '10:00 AM',
            description: 'Free',
            location: 'Idea Forge'
          },
          {
            title: 'Loading 3...',
            start: '3:00 PM',
            end: '4:00 PM',
            description: 'Free',
            location: 'Idea Forge'
          }
        ]
      }
    ]
  });
  const [current, setCurrent] = useState(placeholderEvent);
  const [currentDay, setCurrentDay] = useState('day1');
  const openItem = item => () => {
    setCurrent(item);
    setOpen(true);
  };
  useEffect(() => {
    fetch('https://api.hackcu.org/sheets/events.json')
      .then(res => res.json())
      .then(data => {
        const days = {};
        for (let day of Object.keys(data)) {
          const locations = {};
          for (let item of data[day]) {
            const startTime = !!item.Start
              ? moment(item.Start, 'hh:mm a')
              : null;
            const endTime = !!item.End ? moment(item.End, 'hh:mm a') : null;

            if (!(item.Location in locations)) {
              locations[item.Location] = { title: item.Location, events: [] };
            }

            locations[item.Location].events.push({
              start: item.Start,
              end: item.End,
              title: item.Name,
              location: item.Location,
              description: item.Description,
              startTime,
              endTime
            });
          }
          days[day] = Object.values(locations);
        }
        setItems(days);
        setCurrentDay(Object.keys(days)[0]);
      });
  }, []);
  // close modal on escape button press
  useEffect(() => {
    const escFunction = event => {
      if (event.keyCode === 27) {
        // Escape key
        setOpen(false);
      }
    };
    document.addEventListener('keydown', escFunction);
    return () => document.removeEventListener('keydown', escFunction);
  }, []);

  return (
    <Layout title="Schedule">
      <ScheduleModal
        open={open}
        onClose={() => setOpen(false)}
        title={current.title}
        startTime={current.start}
        endTime={current.end}
      >
        <p
          css={css`
            font-size: 25px;
          `}
        >
          <b>Description:</b> {current.description}
        </p>
        {!!current.location && (
          <p
            css={css`
              font-size: 25px;
            `}
          >
            <b>Location:</b> {current.location}
          </p>
        )}
      </ScheduleModal>
      {/* TODO: Day change to dynamic (not hard coded) */}
      <VerticalAlign>
        <h3>{currentDay === 'day1' ? 'Saturday' : 'Sunday'}</h3>
        <VerticalAlign>
          <Dropdown
            trigger={
              <Button
                css={theme =>
                  css`
                    background-color: ${theme.colors.secondary};
                  `
                }
                node="button"
              >
                Choose Day
              </Button>
            }
          >
            {Object.keys(items).map(item => (
              <a onClick={() => setCurrentDay(item)}>
                {/* TODO: Day change to dynamic (not hard coded) */}
                {item === 'day1' ? 'Saturday' : 'Sunday'}
              </a>
            ))}
          </Dropdown>
        </VerticalAlign>
      </VerticalAlign>

      <ScheduleCalendar
        autoTime
        groups={items[currentDay]}
        hourHeight={200}
        openEvent={openItem}
      />
    </Layout>
  );
};
