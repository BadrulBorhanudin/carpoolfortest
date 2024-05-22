import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useToast,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleDot,
  faMapMarkerAlt,
  faCalendarAlt,
  faCar,
  faPersonWalkingLuggage,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { REMOVE_COMMENT, REMOVE_RIDE } from '../utils/mutations';
import { QUERY_RIDES } from '../utils/queries';
import Auth from '../utils/auth';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import CommentAvatar from '../components/CommentAvatar';

const RideList = ({ rides, title, showTitle = true, showUsername = true }) => {
  const [removeRide] = useMutation(REMOVE_RIDE, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const [removeComment] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const toast = useToast();

  const handleRemoveRide = async (rideId) => {
    try {
      await removeRide({ variables: { rideId } });
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

  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  if (!rides.length) {
    return (
      <Heading as='h3' size='lg' mb={4}>
        No Rides Yet
      </Heading>
    );
  }

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
          borderColor='gray.300'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          mb={4}
        >
          <Flex
            alignItems='center'
            justifyContent='space-between'
            bg=''
            color='gray.600'
            p={4}
          >
            <Box flex='1'>
              {showUsername && (
                <Flex alignItems='center'>
                  <Avatar name={ride.rideAuthor} mr={4} />
                  <Box>
                    <Text fontWeight='bold' fontSize='lg'>
                      {ride.rideAuthor}
                    </Text>
                    <Text fontSize='sm'>
                      {ride.rideAuthor === currentUser ? 'You' : ''} posted this
                      ride {ride.createdAt}
                    </Text>
                  </Box>
                </Flex>
              )}
            </Box>
            <Flex alignItems='center' ml={2}>
              <Text
                mr={2}
                fontSize='md'
                display={{ base: 'none', md: 'inline' }}
              >
                {ride.isDriver ? 'Driver' : 'Passenger'}
              </Text>
              <FontAwesomeIcon
                icon={ride.isDriver ? faCar : faPersonWalkingLuggage}
                color={ride.isDriver ? '#808080' : '#808080'}
              />
              {ride.rideAuthor === currentUser && (
                <Popover placement='bottom-end'>
                  <PopoverTrigger>
                    <IconButton
                      icon={<FontAwesomeIcon icon={faEllipsis} />}
                      variant='ghost'
                      size='md'
                      left='8px'
                    />
                  </PopoverTrigger>
                  <PopoverContent width='fit-content'>
                    <PopoverArrow />
                    {/* <PopoverCloseButton /> */}
                    <PopoverHeader>Manage Ride</PopoverHeader>
                    <PopoverBody>
                      <Button
                        colorScheme='red'
                        size='sm'
                        rounded='full'
                        onClick={() => handleRemoveRide(ride._id)}
                      >
                        Remove Ride
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
            </Flex>
          </Flex>
          <Box p={4} mt='-4'>
            <Divider
              mb='2'
              pl=''
              orientation='horizontal'
              borderColor='gray.300'
            />
            <Flex alignItems='center'>
              <Box position='relative' mr={3}>
                <FontAwesomeIcon icon={faCircleDot} color='#2C7A7B' />
                <Box
                  position='absolute'
                  top='1.25rem'
                  left='0.75rem'
                  w='1px'
                  h='3rem'
                  bg=''
                >
                  <Box
                    position='absolute'
                    top='0.4rem'
                    left='-8px'
                    w='7px'
                    h='7px'
                    borderRadius='full'
                    bg='gray.300'
                  ></Box>
                  <Box
                    position='absolute'
                    top='1.3rem'
                    left='-8px'
                    w='7px'
                    h='7px'
                    borderRadius='full'
                    bg='gray.300'
                  ></Box>
                </Box>
              </Box>
              <Box>
                <Text color='gray.500' fontSize='sm'>
                  Origin
                </Text>
                <Text fontWeight='bold' fontSize='md'>
                  {ride.origin}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems='center' mt={2}>
              <Box position='relative' mr={3} left='1px'>
                <FontAwesomeIcon icon={faMapMarkerAlt} color='#B22222' />
              </Box>
              <Box pl='1' mt=''>
                <Text color='gray.500' fontSize='sm'>
                  Destination
                </Text>
                <Text fontWeight='bold' fontSize='md'>
                  {ride.destination}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems='center' mt={2}>
              <Box position='relative' mr={3} left='1px'>
                <FontAwesomeIcon icon={faClock} color='#808080' />
              </Box>
              <Box pl={-1} pr={3}>
                <Text color='gray.500' fontSize='sm'>
                  Time
                </Text>
                <Text fontWeight='bold' fontSize='md'>
                  {ride.time}
                </Text>
              </Box>
              <Box position='relative' ml={6} mr={3} left='1px'>
                <FontAwesomeIcon icon={faCalendarAlt} color='#808080' />
              </Box>
              <Box pl={-1}>
                <Text color='gray.500' fontSize='sm'>
                  Date
                </Text>
                <Text fontWeight='bold' fontSize='md'>
                  {ride.date}
                </Text>
              </Box>
            </Flex>

            {/* <CommentForm rideId={ride._id} />
            <CommentList comments={ride.comments} rideId={ride._id} /> */}
            <CommentAvatar comments={ride.comments} rideId={ride._id} />
            {/* 
            <Flex mt={4} justifyContent='flex-end'>
              <Link to={`/rides/${ride._id}`}>
                <Button variant='solid' colorScheme='blue' borderRadius='full'>
                  go to post
                </Button>
              </Link>
            </Flex> */}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RideList;
