import { useQuery } from '@apollo/client';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

import RideList from '../components/RideList';
import RideForm from '../components/RideForm';

import { QUERY_RIDES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RIDES);
  const rides = data?.rides || [];

  return (
    <main>
      <Flex justify='center' align='center' direction='column'>
        <Box
          w={{ base: '100%', md: '80%' }}
          p={3}
          mb={4}
        >
          <RideForm />
        </Box>
        <Box w={{ base: '100%', md: '60%' }} p={3}>
          {loading ? (
            <Spinner size='xl' />
          ) : (
            <RideList rides={rides} title='Available Rides...' />
          )}
        </Box>
      </Flex>
    </main>
  );
};

export default Home;
