import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '../components/layout';
import { css } from '@emotion/core';
import ScheduleCalendar from '../components/schedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Portal from '../components/portal';

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
  description: 'fkasdfl;aksd;f askd;fl aksd;lfkasd;l kfal;sdf k'
};

export default () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(placeholderEvent);
  const [items, setItems] = useState([
    {
      title: 'Idea Forge',
      events: [
        {
          title: 'Loading...',
          start: '1:00 PM',
          end: '3:00 PM',
          description: 'Free',
          location: 'Idea Forge'
        },
        {
          title: 'Loading...',
          start: '1:00 PM',
          end: '3:00 PM',
          description: 'fkasdfl;aksd;f askd;fl aksd;lfkasd;l kfal;sdf k'
        },
        {
          title: 'Loading...',
          start: '1:00 PM',
          end: '3:00 PM',
          description: 'fkasdfl;aksd;f askd;fl aksd;lfkasd;l kfal;sdf k'
        }
      ]
    }
  ]);
  const openItem = item => () => {
    setCurrent(item);
    setOpen(true);
  };
  useEffect(() => {
    fetch('https://api.hackcu.org/sheets/events.json')
      .then(res => res.json())
      .then(data => {
        const groups = {};
        for (let item of data.day1) {
          const startTime = !!item.Start ? moment(item.Start, 'hh:mm a') : null;
          const endTime = !!item.End ? moment(item.End, 'hh:mm a') : null;

          if (!(item.Location in groups)) {
            groups[item.Location] = { title: item.Location, events: [] };
          }

          groups[item.Location].events.push({
            start: item.Start,
            end: item.End,
            title: item.Name,
            location: item.Location,
            description: item.Description,
            startTime,
            endTime
          });
        }
        setItems(Object.values(groups));
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

      <ScheduleCalendar
        autoTime
        groups={items}
        hourHeight={200}
        openEvent={openItem}
      />

      {/* TODO: mobile */}
      {/* <ul>
        {items.map(item => (
          <VerticalAlign>
            <li
              onClick={openItem(item)}
              css={theme => css`
                cursor: pointer;
                background-color: ${theme.colors.secondary};
                margin-top: 0.5rem;
                color: ${theme.colors.text};
                height: 150px;
                box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.2);
                padding-left: 2rem;
                padding-right: 2rem;
              `}
            >
              <VerticalAlign>
                <span>
                  {item.start} - {item.end}
                </span>
                <br />
                <em>{item.title}</em>
              </VerticalAlign>
            </li>
          </VerticalAlign>
        ))}
      </ul> */}
    </Layout>
  );
};
