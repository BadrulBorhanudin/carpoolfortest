import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';

import RideForm from '../components/RideForm';
import RideList from '../components/RideList';

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

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/me' />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (!user?.username) {
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
        <RideList
          rides={user.rides}
          title={`${user.username}'s rides...`}
          showTitle={false}
          showUsername={false}
          handleRemoveRide={userParam ? null : handleRemoveRide}
        />
      </Box>

      {!userParam && (
        <Box p={3} mb={3}>
          <RideForm />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
