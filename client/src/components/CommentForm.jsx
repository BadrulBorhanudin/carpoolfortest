import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';

import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const CommentForm = ({ rideId }) => {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: {
          rideId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
      toast({
        title: 'Comment added.',
        description: 'Your comment has been added successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error adding comment.',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <Box>
      <Text fontSize='xl' mb={4}>
        Do you need a lift?
      </Text>

      {Auth.loggedIn() ? (
        <>
          <Text
            mb={2}
            color={characterCount === 280 || error ? 'red.500' : 'black'}
          >
            Character Count: {characterCount}/280
            {error && (
              <Text ml={2} color='red.500'>
                {error.message}
              </Text>
            )}
          </Text>
          <form onSubmit={handleFormSubmit}>
            <FormControl mb={4}>
              <FormLabel htmlFor='commentText'>Add your request</FormLabel>
              <Textarea
                id='commentText'
                name='commentText'
                placeholder='Add your request...'
                value={commentText}
                onChange={handleChange}
                resize='vertical'
              />
            </FormControl>
            <Button colorScheme='blue' type='submit'>
              Request Ride
            </Button>
          </form>
        </>
      ) : (
        <Text>
          You need to be logged in to request the ride. Please{' '}
          <Button variant='link' colorScheme='blue' onClick={onLoginOpen}>
            login
          </Button>{' '}
          or{' '}
          <Button variant='link' colorScheme='blue' onClick={onSignupOpen}>
            signup
          </Button>
          .
        </Text>
      )}
      <Login isOpen={isLoginOpen} onClose={onLoginClose} />
      <Signup isOpen={isSignupOpen} onClose={onSignupClose} />
    </Box>
  );
};

export default CommentForm;
