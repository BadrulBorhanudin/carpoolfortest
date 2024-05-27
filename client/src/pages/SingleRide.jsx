import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  useToast,
  useOutsideClick,
} from '@chakra-ui/react';
import { QUERY_SINGLE_RIDE, QUERY_RIDES } from '../utils/queries';
import { REMOVE_COMMENT, REMOVE_RIDE } from '../utils/mutations';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Layout from '../components/Layout';
import Auth from '../utils/auth';
import RideList from '../components/RideList';

const SingleRide = () => {
  const { id: rideId } = useParams();
  const toast = useToast();
  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  const { loading, data } = useQuery(QUERY_SINGLE_RIDE, {
    variables: { rideId },
  });

  const [removeRide] = useMutation(REMOVE_RIDE, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const [removeComment] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const [rideDeleted, setRideDeleted] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef();

  const ride = data?.ride || {};

  useOutsideClick({
    ref: popoverRef,
    handler: () => setIsPopoverOpen(false),
  });

  if (loading) {
    return <Spinner />;
  }

  const handleRemoveRide = async (rideId) => {
    try {
      await removeRide({ variables: { rideId } });
      setRideDeleted(true);
      toast({
        title: 'Ride removed.',
        description: 'The ride has been removed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error removing ride.',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRemoveComment = async (rideId, commentId) => {
    try {
      await removeComment({ variables: { rideId, commentId } });
      toast({
        title: 'Comment removed.',
        description: 'The comment has been removed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error removing comment.',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
  return (
    <Layout>
      <RideList
        rides={[ride]}
        showTitle={true}
        showUsername={true}
        showCommentAvatar={false}
      />
      <Box>
        <CommentForm rideId={ride._id} />
        <CommentList comments={ride.comments} rideId={ride._id} />
      </Box>
    </Layout>
  );
};

export default SingleRide;
