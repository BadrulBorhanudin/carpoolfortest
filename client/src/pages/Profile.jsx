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

  const { data: rideData, loading: rideLoading } = useQuery(QUERY_RIDES);

  const user = data?.me || data?.user || {};
  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  if (loading || rideLoading) {
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

  // Filter rides to only include those posted by the logged-in user
  const userRides = user.rides.filter(
    (ride) => ride.rideAuthor === currentUser
  );

  // Collect rides where the current user has commented
  const commentedRides = rideData?.rides.filter((ride) =>
    ride.comments.some((comment) => comment.commentAuthor === currentUser)
  );

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
              rides={userRides}
              title={`${user.username}'s rides...`}
              showTitle={false}
              showUsername={true}
              handleRemoveRide={handleRemoveRide}
            />
          ) : (
            <RideList
              rides={userRides}
              title='Your rides...'
              showTitle={true}
              showUsername={false}
              handleRemoveRide={handleRemoveRide}
            />
          )}
        </Box>

        <Box mb={5}>
          <RideList
            rides={commentedRides}
            title="Rides you've commented on..."
            showTitle={true}
            showUsername={true}
          />
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
