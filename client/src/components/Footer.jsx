import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as='footer'
      w='100%'
      p={4}
      color='black'
      textAlign='center'
      mt='auto'
      bg='#F3F2F4'
    >
      <Text>
        Made with{' '}
        <span role='img' aria-label='heart' aria-hidden='false'>
          ❤️
        </span>{' '}
        by Badrul Borhanudin.
      </Text>
      <Text mt={2}>
        &copy; {new Date().getFullYear()} CarPoolHub. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
