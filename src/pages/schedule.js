import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Schedule from '../components/schedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Portal from '../components/portal';
import { Flex, Box, Text, Heading } from 'rebass';

const ScheduleModal = ({
  title,
  startTime,
  endTime,
  children,
  onClose,
  open = false
}) => (
  <Portal>
    <Box
      bg="white"
      sx={{
        zIndex: 10,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        visibility: open ? 'visible' : 'hidden',
        transition: 'transform 0.4s, visibility 0.4s'
      }}
    >
      <Flex color="white" bg="primary" px={2} py={3}>
        <Box px={3} py={5}>
          <Heading as="h3" fontSize={6}>
            {title}
          </Heading>
          <Text>
            {startTime}
            {!!endTime ? ` - ${endTime}` : ''}
          </Text>
        </Box>
        {/* Spacing */}
        <Box mx="auto" />
        <Flex>
          <Box ml="auto" my="auto" mr={3} fontSize={4}>
            <FontAwesomeIcon icon={faTimes} onClick={onClose} />
          </Box>
        </Flex>
      </Flex>
      <Box bg="white" px={4}>
        {children}
      </Box>
    </Box>
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

// todo: mobile view
// multiple days
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
  const openItem = (item) => {
    setCurrent(item);
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };
  useEffect(() => {
    fetch('https://api.hackcu.org/sheets/events.json')
      .then((res) => res.json())
      .then((data) => {
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
    const escFunction = (event) => {
      if (event.keyCode === 27) {
        // Escape key
        setOpen(false);
        document.body.style.overflow = 'initial';
      }
    };
    document.addEventListener('keydown', escFunction);
    return () => document.removeEventListener('keydown', escFunction);
  }, []);

  console.log(items);
  let times = [];
  for (let x = 8; x <= 18; ++x) {
    times.push(x);
  }

  return (
    <Layout title="Schedule">
      <ScheduleModal
        open={open}
        onClose={() => {
          document.body.style.overflow = 'initial';
          setOpen(false);
        }}
        title={current.title}
        startTime={current.start}
        endTime={current.end}
      >
        <Text mt={4} fontSize={4}>
          <Text as="b">Description:</Text> {current.description}
        </Text>
        {!!current.location && (
          <Text mt={3} fontSize={4}>
            <Text as="b">Location:</Text> {current.location}
          </Text>
        )}
      </ScheduleModal>

      <Schedule
        autoTime
        groups={items[currentDay]}
        hourHeight={75}
        openEvent={openItem}
        items={items}
      />
    </Layout>
  );
};
