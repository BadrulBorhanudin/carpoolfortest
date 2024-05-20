import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Flex,
  Spinner,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';

import RideList from '../components/RideList';
import RideForm from '../components/RideForm';
import Layout from '../components/Layout';

import { QUERY_RIDES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RIDES);
  const rides = data?.rides || [];
  const [filter, setFilter] = useState('all');

  const filteredRides = rides.filter((ride) => {
    if (filter === 'all') return true;
    if (filter === 'driver') return ride.isDriver;
    if (filter === 'passenger') return !ride.isDriver;
  });

  return (
    <Layout>
      <Flex justify='center' align='center' direction='column' width='100%' mt={4}>
        <Box width='100%' mb={4}>
          <RideForm />
        </Box>
        <Box width='100%' p={4} mt={4}>
          <RadioGroup onChange={setFilter} value={filter}>
            <Stack direction='row'>
              <Radio value='all'>All</Radio>
              <Radio value='driver'>Driver</Radio>
              <Radio value='passenger'>Passenger</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box width='100%' maxW='900px'>
          {loading ? (
            <Spinner size='xl' />
          ) : (
            <RideList rides={filteredRides} title='Available Rides...' />
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Home;
