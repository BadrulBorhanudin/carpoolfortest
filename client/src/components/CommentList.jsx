import { useMutation } from '@apollo/client';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { REMOVE_COMMENT } from '../utils/mutations';
import { QUERY_RIDES } from '../utils/queries';
import Auth from '../utils/auth';

const CommentList = ({ comments = [], rideId }) => {
  const [removeComment] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const handleRemoveComment = async (commentId) => {
    try {
      await removeComment({ variables: { rideId, commentId } });
    } catch (err) {
      console.error(err);
    }
  };

  if (!comments.length) {
    return (
      <Heading as='h3' size='md'>
        No Requests Yet
      </Heading>
    );
  }

  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  return (
    <Box>
      <Heading as='h3' size='md' mb={4} borderBottom='1px dotted #1a1a1a'>
        Comments
      </Heading>
      <VStack spacing={4} align='stretch'>
        {comments.map((comment) => (
          <Box
            key={comment._id}
            p={4}
            bg='gray.700'
            color='white'
            borderRadius='md'
          >
            <Heading as='h5' size='sm' mb={2}>
              {comment.commentAuthor} commented{' '}
              <Text as='span' fontSize='xs'>
                on {comment.createdAt}
              </Text>
            </Heading>
            <Text mb={4}>{comment.commentText}</Text>
            {Auth.loggedIn() && currentUser === comment.commentAuthor && (
              <Button
                colorScheme='red'
                onClick={() => handleRemoveComment(comment._id)}
              >
                Remove Comment
              </Button>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CommentList;
