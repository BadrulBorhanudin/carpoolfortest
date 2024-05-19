import React from 'react';
import { Box, Tabs, TabList, Tab, TabIndicator } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <Box maxW='900px' mx='auto' p={4}>
      <Tabs
        isFitted
        variant='unstyled'
        position='sticky'
        top='0'
        zIndex='sticky'
        bg='white'
        shadow='sm'
      >
        <TabList borderBottom='1px solid' borderColor='#150035'>
          <Tab
            as={RouterLink}
            to='/'
            color='#150035'
            fontWeight='bold'
            fontSize='lg'
            _selected={{ color: 'blue.500', fontWeight: 'bold' }}
            _focus={{ boxShadow: 'none' }}
          >
            Home
          </Tab>
          <Tab
            as={RouterLink}
            to='/about'
            color='#150035'
            fontWeight='bold'
            fontSize='lg'
            _selected={{ color: 'blue.500', fontWeight: 'bold' }}
            _focus={{ boxShadow: 'none' }}
          >
            About
          </Tab>
          <Tab
            as={RouterLink}
            to='/support-me'
            color='#150035'
            fontWeight='bold'
            fontSize='lg'
            _selected={{ color: 'blue.500', fontWeight: 'bold' }}
            _focus={{ boxShadow: 'none' }}
          >
            Support Me
          </Tab>
        </TabList>
        <TabIndicator mt='-2px' height='3px' bg='blue.500' borderRadius='1px' />
      </Tabs>
    </Box>
  );
};

export default Navigation;