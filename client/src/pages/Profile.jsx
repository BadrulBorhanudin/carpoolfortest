import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Heading, Spinner, Text, Button, Flex } from '@chakra-ui/react';

import RideForm from '../components/RideForm';
import RideList from '../components/RideList';
import Layout from '../components/Layout';

import { QUERY_USER, QUERY_ME, QUERY_RIDES } from '../utils/queries';
import { REMOVE_RIDE } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const [removeRide] = useMutation(REMOVE_RIDE, {
    refetchQueries: [
      { query: QUERY_RIDES },
      {
        query: userParam ? QUERY_USER : QUERY_ME,
        variables: { username: userParam },
      },
    ],
  });

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (loading) {
    return <Spinner />;
  }

  const isLoggedInUser =
    Auth.loggedIn() && Auth.getProfile().data.username === userParam;

  if (!isLoggedInUser && !user?.username) {
    return (
      <Box>
        <Heading as='h4' size='md'>
          You need to be logged in to see this. Use the navigation links above
          to sign up or log in!
        </Heading>
      </Box>
    );
  }

  const handleRemoveRide = async (rideId) => {
    try {
      await removeRide({ variables: { rideId } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Box>
        <Box textAlign='center' mb={5}>
          <Heading
            as='h2'
            size='lg'
            bg='blue.500'
            color='white'
            p={3}
            borderRadius='md'
          >
            Viewing {userParam ? `${user.username}'s` : 'your'} profile.
          </Heading>
        </Box>

        <Box mb={5}>
          {userParam ? (
            <RideList
              rides={user.rides}
              title={`${user.username}'s rides...`}
              showTitle={false}
              showUsername={true}
              handleRemoveRide={null}
            />
          ) : (
            user.rides.map((ride) => (
              <Box
                key={ride._id}
                bg='gray.100'
                py={4}
                px={2}
                borderRadius='md'
                mb={4}
              >
                <Text
                  fontSize='xl'
                  fontStyle='italic'
                  border='2px #1a1a1a'
                  p={4}
                  mb={4}
                >
                  Origin: {ride.origin} <br />
                  Destination: {ride.destination} <br />
                  Date: {ride.date} <br />
                  Time: {ride.time}
                </Text>
                <Flex justifyContent='flex-end'>
                  <Button
                    colorScheme='red'
                    onClick={() => handleRemoveRide(ride._id)}
                  >
                    Remove Ride
                  </Button>
                </Flex>
              </Box>
            ))
          )}
        </Box>

        {!userParam && (
          <Box mb={3}>
            <RideForm />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Profile;
