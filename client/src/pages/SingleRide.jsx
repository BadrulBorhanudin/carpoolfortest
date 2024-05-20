import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Heading, Text, Spinner, Divider } from '@chakra-ui/react';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Layout from '../components/Layout';

import { QUERY_SINGLE_RIDE } from '../utils/queries';

const SingleRide = () => {
  const { id: rideId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RIDE, {
    variables: { rideId: rideId },
  });

  const ride = data?.ride || {};

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <Box my={3}>
        <Heading
          as='h3'
          size='lg'
          bg='blue.500'
          color='white'
          p={2}
          mb={4}
          borderRadius='md'
        >
          {ride.rideAuthor} <br />
          <Text fontSize='md'>posted this ride {ride.createdAt}</Text>
        </Heading>
        <Box bg='gray.100' py={4} px={2} borderRadius='md'>
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
        </Box>

        <Box my={5}>
          <CommentList comments={ride.comments} rideId={ride._id} />
        </Box>
        <Box m={3} p={4} borderRadius='md'>
          <CommentForm rideId={ride._id} />
        </Box>
      </Box>
    </Layout>
  );
};

export default SingleRide;
