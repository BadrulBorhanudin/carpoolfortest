import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      as='footer'
      w='100%'
      bg='blue.600'
      p={4}
      color='white'
      textAlign='center'
    >
      {location.pathname !== '/' && (
        <Button
          onClick={() => navigate(-1)}
          colorScheme='blue'
          variant='solid'
          mb={3}
        >
          &larr; Go Back
        </Button>
      )}
      <Text>
        Made with{' '}
        <span role='img' aria-label='heart' aria-hidden='false'>
          ❤️
        </span>{' '}
        by the CarPoolHub team.
      </Text>
    </Box>
  );
};

export default Footer;
