import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Flex,
  Spinner,
  Text,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';

import RideList from '../components/RideList';
import RideForm from '../components/RideForm';

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
    <Flex justify='center' align='center' direction='column'>
      <Box w='100%' p={3} mb={4}>
        <RideForm />
      </Box>
      <Box w='100%' p={3}>
        <RadioGroup onChange={setFilter} value={filter} mb={4}>
          <Stack direction='row'>
            <Radio value='all'>All</Radio>
            <Radio value='driver'>Driver</Radio>
            <Radio value='passenger'>Passenger</Radio>
          </Stack>
        </RadioGroup>
        {loading ? (
          <Spinner size='xl' />
        ) : (
          <RideList rides={filteredRides} title='Available Rides...' />
        )}
      </Box>
    </Flex>
  );
};

export default Home;
