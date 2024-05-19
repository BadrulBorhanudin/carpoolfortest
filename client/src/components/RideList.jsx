import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { REMOVE_COMMENT } from '../utils/mutations';
import { QUERY_RIDES } from '../utils/queries';
import Auth from '../utils/auth';

const RideList = ({
  rides,
  title,
  showTitle = true,
  showUsername = true,
  handleRemoveRide,
}) => {
  const [removeComment] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const toast = useToast();

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

  if (!rides.length) {
    return (
      <Heading as='h3' size='lg' mb={4}>
        No Rides Yet
      </Heading>
    );
  }

  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  return (
    <Box>
      {showTitle && (
        <Heading as='h3' size='lg' mb={4}>
          {title}
        </Heading>
      )}
      {rides.map((ride) => (
        <Box
          key={ride._id}
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          mb={4}
        >
          <Flex alignItems='center' bg='blue.500' color='white' p={4}>
            <Box flex='1'>
              {showUsername ? (
                <Link to={`/profiles/${ride.rideAuthor}`}>
                  <Text fontWeight='bold' fontSize='lg'>
                    {ride.rideAuthor}
                  </Text>
                  <Text fontSize='sm'>
                    posted this ride on {ride.createdAt}
                  </Text>
                </Link>
              ) : (
                <Text fontSize='sm'>
                  You posted this ride on {ride.createdAt}
                </Text>
              )}
            </Box>
            {handleRemoveRide && (
              <Button
                colorScheme='red'
                onClick={() => handleRemoveRide(ride._id)}
              >
                Remove
              </Button>
            )}
          </Flex>
          <Box p={4}>
            <Text>
              <strong>Origin:</strong> {ride.origin}
            </Text>
            <Text>
              <strong>Destination:</strong> {ride.destination}
            </Text>
            <Text>
              <strong>Date:</strong> {ride.date}
            </Text>
            <Text>
              <strong>Time:</strong> {ride.time}
            </Text>
            {ride.comments &&
              ride.comments.map((comment) => (
                <Box
                  key={comment._id}
                  p={2}
                  mt={2}
                  borderWidth='1px'
                  borderRadius='lg'
                >
                  <Text>{comment.commentText}</Text>
                  <Text fontSize='sm'>
                    by {comment.commentAuthor} on {comment.createdAt}
                  </Text>
                  {Auth.loggedIn() && currentUser === comment.commentAuthor && (
                    <Button
                      colorScheme='red'
                      size='sm'
                      onClick={() => handleRemoveComment(ride._id, comment._id)}
                    >
                      Remove Comment
                    </Button>
                  )}
                </Box>
              ))}
          </Box>
          <Link to={`/rides/${ride._id}`}>
            <Button colorScheme='blue' width='100%' borderRadius='0' textDecoration='underline'>
              Join this ride.
            </Button>
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default RideList;
