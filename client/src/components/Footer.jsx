import { Box, Button, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      {location.pathname !== '/' && (
        <Button
          onClick={() => navigate(-1)}
          colorScheme='blue'
          variant='solid'
          mb={3}
          rounded='full'
          leftIcon={<FontAwesomeIcon icon={faBackward} />}
        >
          Back
        </Button>
      )}
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
