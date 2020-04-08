import React, { useState } from 'react';
import { Link as ReactLink } from 'gatsby';
import Countdown from './countdown';
import { Box, Flex, Text, Link } from 'rebass';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box mb={5}>
      <Flex
        as="header"
        px={2}
        py={3}
        bg="secondary"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10
        }}
      >
        {/* Mobile Nav */}
        <Box
          ml={2}
          py={3}
          display={['inherit', 'inherit', 'none']}
          color="white"
          onClick={() => setOpen(true)}
          sx={{ cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={faBars} />
        </Box>
        {/* Items */}
        <Flex
          display={['inherit', 'inherit', 'none']}
          py={1}
          flexDirection="column"
          bg="white"
          sx={{
            zIndex: 10,
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: 300,
            transform: open ? 'translateX(0%)' : 'translateX(-105%)',
            transition: 'transform .1s ease-in-out'
          }}
        >
          <Link as={ReactLink} ml={2} p={3} color="text" to="/">
            Home
          </Link>
          <Link as={ReactLink} ml={2} p={3} color="text" to="/events">
            Events
          </Link>
          <Link as={ReactLink} ml={2} p={3} color="text" to="/rules">
            Rules
          </Link>
          <Link as={ReactLink} ml={2} p={3} color="text" to="/prizes">
            Prizes
          </Link>
          <Link as={ReactLink} ml={2} p={3} color="text" to="/schedule">
            Schedule
          </Link>
        </Flex>
        {/* Mobile nav overlay (dark part) */}
        <Box
          display={[
            open ? 'inherit' : 'none',
            open ? 'inherit' : 'none',
            'none'
          ]}
          bg="rgba(0,0,0,.5)"
          sx={{
            zIndex: 5,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          onClick={() => setOpen(false)}
        />

        {/* Desktop nav */}
        <Box display={['none', 'none', 'inherit']} py={1}>
          <Link as={ReactLink} p={2} color="textDark" to="/">
            Home
          </Link>
          <Link as={ReactLink} p={2} color="textDark" to="/events">
            Events
          </Link>
          <Link as={ReactLink} p={2} color="textDark" to="/rules">
            Rules
          </Link>
          <Link as={ReactLink} p={2} color="textDark" to="/prizes">
            Prizes
          </Link>
          <Link as={ReactLink} p={2} color="textDark" to="/schedule">
            Schedule
          </Link>
        </Box>

        {/* <Box mx="auto" /> */}
        <Flex
          color="textDark"
          bg="primary"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            bottom: -10,
            boxShadow:
              '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)'
          }}
          px={4}
        >
          <Box my="auto" fontSize={4}>
            <Countdown />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
