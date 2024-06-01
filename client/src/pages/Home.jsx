import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Flex,
  Spinner,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import RideList from '../components/RideList';
import RideForm from '../components/RideForm';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

import { QUERY_RIDES } from '../utils/queries';

const Home = () => {
  // Fetch rides data using useQuery hook
  const { loading, data } = useQuery(QUERY_RIDES);
  const rides = data?.rides || [];

  // State to manage filter and selected date
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);

  // Filter rides based on filter and selected date
  const filteredRides = rides
    .filter((ride) => {
      if (filter === 'all') return true;
      if (filter === 'driver') return ride.isDriver;
      if (filter === 'passenger') return !ride.isDriver;
      return true;
    })
    .filter((ride) => {
      if (!selectedDate) return true;
      return new Date(ride.date).toDateString() === selectedDate.toDateString();
    });
  
  // Handle filter change
  const handleFilter = (value) => {
    setFilter(value);
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getButtonColorScheme = (value) =>
    filter === value ? 'blue' : 'blackAlpha';

  return (
    <Layout>
      <Hero />
      <Flex
        justify='center'
        align='center'
        direction='column'
        width='100%'
        mt={4}
      >
        {/* Ride Form Component */}
        <Box width='100%' mb={4}>
          <RideForm />
        </Box>
        <Flex
          width='100%'
          justifyContent='space-between'
          align='center'
          pb={4}
          mt={8}
          mb={1}
        >
          {/* Heading and Filter Component */}
          <Heading as='h3' size='md'>
            {filteredRides.length > 0
              ? 'Available Ride(s) ...'
              : 'No Rides Available Yet'}
          </Heading>
          <Menu placement='bottom-end'>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              borderRadius='full'
              colorScheme={getButtonColorScheme(filter)}
              textAlign='center'
            >
              Filters
            </MenuButton>
            <MenuList display='flex' flexDirection='column' alignItems='center'>
              <MenuItem
                onClick={() => handleFilter('all')}
                color={filter === 'all' ? 'blue.500' : 'black'}
                justifyContent='center'
              >
                All
              </MenuItem>
              <MenuItem
                onClick={() => handleFilter('driver')}
                color={filter === 'driver' ? 'blue.500' : 'black'}
                justifyContent='center'
              >
                Driver
              </MenuItem>
              <MenuItem
                onClick={() => handleFilter('passenger')}
                color={filter === 'passenger' ? 'blue.500' : 'black'}
                justifyContent='center'
              >
                Passenger
              </MenuItem>
              <MenuDivider />
              <Box px={4} py={2} textAlign='center'>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  placeholderText='Select Date'
                  dateFormat='yyyy-MM-dd'
                  isClearable
                  customInput={
                    <Button
                      borderRadius='full'
                      colorScheme={selectedDate ? 'blue' : 'blackAlpha'}
                      minWidth='200px'
                    >
                      {selectedDate
                        ? selectedDate.toDateString()
                        : 'Select Date'}
                    </Button>
                  }
                />
              </Box>
            </MenuList>
          </Menu>
        </Flex>
        <Box width='100%'>
          {loading ? <Spinner size='xl' /> : <RideList rides={filteredRides} />}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Home;
