import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Flex, Spinner, Button } from '@chakra-ui/react';

import RideList from '../components/RideList';
import RideForm from '../components/RideForm';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

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

  const handleFilter = (value) => {
    setFilter(value);
  };

  return (
    <Layout>
      <Flex
        justify='center'
        align='center'
        direction='column'
        width='100%'
        mt={4}
      >
        <Box width='100%' mb={4}>
          <RideForm />
        </Box>
        <Box width='100%' pb={4} mt={8} mb={1}>
          <Button
            borderRadius='full'
            onClick={() => handleFilter('all')}
            colorScheme={filter === 'all' ? 'blue' : 'blackAlpha'}
          >
            All
          </Button>
          <Button
            borderRadius='full'
            onClick={() => handleFilter('driver')}
            colorScheme={filter === 'driver' ? 'blue' : 'blackAlpha'}
            ml={2}
          >
            Driver
          </Button>
          <Button
            borderRadius='full'
            onClick={() => handleFilter('passenger')}
            colorScheme={filter === 'passenger' ? 'blue' : 'blackAlpha'}
            ml={2}
          >
            Passenger
          </Button>
        </Box>
        <Box width='100%'>
          {loading ? (
            <Spinner size='xl' />
          ) : (
            <RideList rides={filteredRides} title='Available Rides...' />
          )}
        </Box>
        <Button as={Link} to='/map' colorScheme='blue' mt={4}></Button>
      </Flex>
      
    </Layout>
  );
};

export default Home;
