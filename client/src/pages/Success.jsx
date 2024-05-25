import Layout from '../components/Layout';
import { Heading, Text, Box, Center } from '@chakra-ui/react';

const SuccessPage = () => {
  return (
    <Layout>
      <Center>
        <Box p={8} textAlign='center'>
          <Heading as='h1' size='xl' mb={4}>
            Thank You!
          </Heading>
          <Text fontSize='lg'>
            Your donation has been processed successfully.
          </Text>
          <Text mt={4}>We appreciate your support for CarPoolHub!</Text>
        </Box>
      </Center>
    </Layout>
  );
};

export default SuccessPage;
