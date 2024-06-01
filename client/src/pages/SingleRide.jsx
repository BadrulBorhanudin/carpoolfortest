import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Heading,
  Text,
  Spinner,
  useOutsideClick,
} from '@chakra-ui/react';
import { QUERY_SINGLE_RIDE } from '../utils/queries';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Layout from '../components/Layout';
import Auth from '../utils/auth';
import RideList from '../components/RideList';

const SingleRide = () => {
  const { id: rideId } = useParams();
  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  const { loading, data } = useQuery(QUERY_SINGLE_RIDE, {
    variables: { rideId },
  });

  const [rideDeleted, setRideDeleted] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef();

  const ride = data?.ride || {};

  // Handle outside click for popover
  useOutsideClick({
    ref: popoverRef,
    handler: () => setIsPopoverOpen(false),
  });

  // Loading state
  if (loading) {
    return <Spinner />;
  }

  // Ride deleted state
  if (rideDeleted) {
    return (
      <Layout>
        <Box my={3}>
          <Box
            borderColor='gray.300'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            mb={4}
            p={4}
          >
            <Heading size='md' color='red.500'>
              Ride Deleted
            </Heading>
            <Text>This ride has been deleted.</Text>
          </Box>
        </Box>
      </Layout>
    );
  }
  
  // Main render
  return (
    <Layout>
      <Box>
        <RideList
          rides={[ride]}
          showTitle={true}
          showUsername={true}
          showCommentAvatar={false}
        />
        <CommentForm rideId={ride._id} />
        <CommentList comments={ride.comments} rideId={ride._id} />
      </Box>
    </Layout>
  );
};

export default SingleRide;
