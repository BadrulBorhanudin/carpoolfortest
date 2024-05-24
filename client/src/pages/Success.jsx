import React from 'react';
import Layout from '../components/Layout';
import { Heading, Text, Box } from '@chakra-ui/react';

const SuccessPage = () => {
  return (
    <Layout>
      <Box p={8}>
        <Heading as='h1' size='xl' mb={4}>
          Thank You!
        </Heading>
        <Text fontSize='lg'>
          Your donation has been processed successfully.
        </Text>
        <Text mt={4}>We appreciate your support for CarpoolHub!</Text>
        {/* You can add additional content or links here */}
      </Box>
    </Layout>
  );
};

export default SuccessPage;
