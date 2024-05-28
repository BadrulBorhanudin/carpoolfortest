import {
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <Box
      as='footer'
      w='100%'
      p={4}
      color='black'
      mt='auto'
      bg='#f0f0f0'
      display='flex'
      justifyContent='center'
    >
      <Box maxW='900px' w='100%' px={4}>
        <Divider mb='4' orientation='horizontal' borderColor='gray.300' />
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='center'
          wrap='wrap'
          spacing={{ base: 10, md: 0 }}
        >
          {/* Right Section - Quick Links */}
          <VStack align='center' spacing={3} order={{ base: 1, md: 3 }}>
            <Heading as='h4' size='md'>
              Quick Links
            </Heading>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/support'>Support</Link>
          </VStack>

          {/* Center Section - About */}
          <VStack align='center' spacing={3} order={{ base: 2, md: 2 }}>
            <Heading as='h4' size='md'>
              About CarPoolHub
            </Heading>
            <Text textAlign='center' maxW='300px'>
              CarPoolHub is dedicated to connecting drivers and passengers for
              shared rides, helping to save costs and reduce emissions. Join our
              community and start sharing your rides today!
            </Text>
          </VStack>

          {/* Left Section */}
          <VStack align='start' spacing={3} order={{ base: 3, md: 1 }}>
            <Flex alignItems='center'>
              <img
                src={Logo}
                alt='logo'
                width='20px'
              />
              <Text ml={2} fontSize='2xl' color='blue.400' fontWeight='bold'>
                CarPoolHub
              </Text>
            </Flex>
            <Text mt='-2'>
              Made with{' '}
              <span role='img' aria-label='heart' aria-hidden='false'>
                ❤️
              </span>{' '}
              by Badrul Borhanudin.
            </Text>
            <Text fontSize='xs'>
              &copy; {new Date().getFullYear()} CarPoolHub. All rights reserved.
            </Text>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
