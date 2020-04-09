import React, { useState } from 'react';
import { Link as ReactLink } from 'gatsby';
import Countdown from './countdown';
import { Box, Flex, Text, Link } from 'rebass';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useColorMode } from 'theme-ui';
import DarkModeToggle from 'react-dark-mode-toggle';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [colorMode, setColorMode] = useColorMode();
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
          color="textDark"
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
          bg="background"
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
          <Link
            as={ReactLink}
            ml={2}
            p={3}
            color="text"
            to="/"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            as={ReactLink}
            ml={2}
            p={3}
            color="text"
            to="/events"
            onClick={() => setOpen(false)}
          >
            Events
          </Link>
          <Link
            as={ReactLink}
            ml={2}
            p={3}
            color="text"
            to="/rules"
            onClick={() => setOpen(false)}
          >
            Rules
          </Link>
          <Link
            as={ReactLink}
            ml={2}
            p={3}
            color="text"
            to="/prizes"
            onClick={() => setOpen(false)}
          >
            Prizes
          </Link>
          <Link
            as={ReactLink}
            ml={2}
            p={3}
            color="text"
            to="/schedule"
            onClick={() => setOpen(false)}
          >
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
          color="white"
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

        {/* colorMode */}

        <Box ml="auto" my="auto" mr={2}>
          <DarkModeToggle
            onChange={() =>
              setColorMode(colorMode === 'default' ? 'dark' : 'default')
            }
            checked={colorMode !== 'default'}
            size={60}
          />
        </Box>

        {/* <button
          onClick={(e) => {
            setColorMode(colorMode === 'default' ? 'dark' : 'default');
          }}
        >
          Toggle {colorMode === 'default' ? 'Dark' : 'Light'}
        </button> */}
      </Flex>
    </Box>
  );
};

export default Header;
