import { Box, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <Box
        mt={4}
        p={6}
        borderWidth='1px'
        borderRadius='3xl'
        borderColor='gray.300'
        bg='whitesmoke'
        flex='1'
      >
        <Heading as='h1' size='xl' mb={4} textAlign='center'>
          About Me
        </Heading>
        <Text fontSize='lg' mb={4} textAlign='justify'>
          Frustrated with traffic congestion, rising fuel costs, and the
          environmental impact of solo driving, I created CarPoolHub to make a
          difference. My goal is simple: connect drivers and passengers heading
          in the same direction, making travel more affordable, sustainable, and
          enjoyable for everyone.
        </Text>
        <Text fontSize='lg' mb={4} textAlign='justify'>
          CarPoolHub simplifies ride-sharing, allowing you to effortlessly find
          or offer rides with just a few taps. By sharing rides, we can
          significantly reduce the number of cars on the road, leading to less
          traffic, lower emissions, and substantial savings on fuel costs.
        </Text>
        <Text fontSize='lg' mb={4} textAlign='justify'>
          Beyond the practical benefits, CarPoolHub fosters a sense of
          community, connecting people who share similar destinations. Join us
          today and discover the convenience and camaraderie of ride-sharing.
          Together, let's make a positive impact on our wallets, our
          communities, and our planet.
        </Text>
      </Box>
    </Layout>
  );
};

export default About;
