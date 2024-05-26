import { useRef, useState, useEffect } from 'react';
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
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  useOutsideClick,
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
import {
  REMOVE_COMMENT,
  REMOVE_RIDE,
  GEOCODE_ADDRESS,
} from '../utils/mutations';
import { QUERY_RIDES } from '../utils/queries';
import Auth from '../utils/auth';
import CommentAvatar from '../components/CommentAvatar';
import GoogleMapsIcon from '../assets/google-maps-svgrepo-com.svg';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const RideList = ({ rides, title, showTitle = true, showUsername = true }) => {
  const [removeRide] = useMutation(REMOVE_RIDE, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const [removeComment] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const [geocodeAddress] = useMutation(GEOCODE_ADDRESS);

  const toast = useToast();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef();

  useOutsideClick({
    ref: popoverRef,
    handler: () => setIsPopoverOpen(false),
  });

  useEffect(() => {
    const geocodeAddresses = async () => {
      for (const ride of rides) {
        try {
          const originResponse = await geocodeAddress({
            variables: { address: ride.origin },
          });
          const destinationResponse = await geocodeAddress({
            variables: { address: ride.destination },
          });

          console.log(
            `Origin of ride ${ride._id}:`,
            originResponse.data.geocodeAddress
          );
          console.log(
            `Destination of ride ${ride._id}:`,
            destinationResponse.data.geocodeAddress
          );

          // Add a delay between geocoding requests
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(
            `Error geocoding addresses for ride ${ride._id}:`,
            error.message
          );
        }
      }
    };

    if (rides.length) {
      geocodeAddresses();
    }
  }, [rides, geocodeAddress]);

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
      <Heading as='h3' size='md' mb={4}>
        No Rides Yet
      </Heading>
    );
  }

  return (
    <Box>
      {showTitle && (
        <Heading as='h3' size='md' mb={4} align='center'>
          {title}
        </Heading>
      )}
      {rides.map((ride) => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
          ride.origin
        )}&destination=${encodeURIComponent(ride.destination)}`;
        return (
          <Box
            key={ride._id}
            borderColor=''
            borderWidth=''
            borderRadius='2rem'
            overflow='hidden'
            bg='white'
            mb={4}
            boxShadow='xs'
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
                        {ride.rideAuthor === currentUser ? 'You' : ''} posted
                        this ride {ride.createdAt}
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
                  <Popover
                    placement='bottom-end'
                    isOpen={isPopoverOpen}
                    onClose={() => setIsPopoverOpen(false)}
                  >
                    <PopoverTrigger>
                      <IconButton
                        icon={<FontAwesomeIcon icon={faEllipsis} />}
                        variant='ghost'
                        size='md'
                        left='8px'
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                      />
                    </PopoverTrigger>
                    <PopoverContent ref={popoverRef} width='fit-content'>
                      <PopoverArrow />
                      <PopoverHeader fontSize='sm'>Manage Ride</PopoverHeader>
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
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={3} left='-0.05rem'>
                  <FontAwesomeIcon icon={faCircleDot} color='#2C7A7B' />
                </Box>
                <Box pl='' mt=''>
                  <Text color='gray.500' fontSize='sm'>
                    Origin
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {truncateText(ride.origin, 30)}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={5} left='1px'>
                  <Box
                    position='absolute'
                    bottom='0.4rem'
                    left='0.19rem'
                    w='7px'
                    h='7px'
                    borderRadius='full'
                    bg='gray.300'
                  ></Box>
                  <Box
                    position='absolute'
                    top='0.3rem'
                    left='0.19rem'
                    w='7px'
                    h='7px'
                    borderRadius='full'
                    bg='gray.300'
                  ></Box>
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
                    {truncateText(ride.destination, 30)}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={3}>
                  <FontAwesomeIcon icon={faCalendarAlt} color='#808080' />
                </Box>
                <Box>
                  <Text color='gray.500' fontSize='sm'>
                    Date
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {ride.rideDate}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={3}>
                  <FontAwesomeIcon icon={faClock} color='#808080' />
                </Box>
                <Box>
                  <Text color='gray.500' fontSize='sm'>
                    Time
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {ride.rideTime}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={3}>
                  <FontAwesomeIcon icon={faCar} color='#808080' />
                </Box>
                <Box>
                  <Text color='gray.500' fontSize='sm'>
                    Seats Available
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {ride.seatsAvailable}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={3}>
                  <img src={GoogleMapsIcon} alt='Google Maps' width='24' />
                </Box>
                <a
                  href={googleMapsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ textDecoration: 'none' }}
                >
                  <Text color='teal.500' fontWeight='bold' fontSize='md'>
                    Open in Google Maps
                  </Text>
                </a>
              </Flex>
            </Box>
            <Box bg='gray.100' p={4} mt=''>
              <Heading as='h4' size='sm' mb={2}>
                Comments
              </Heading>
              {ride.comments.map((comment) => (
                <Box key={comment._id} mb={4}>
                  <Flex alignItems='center'>
                    <CommentAvatar username={comment.commentAuthor} />
                    <Box ml={2}>
                      <Text fontWeight='bold' fontSize='sm'>
                        {comment.commentAuthor}
                      </Text>
                      <Text fontSize='xs' color='gray.500'>
                        {comment.createdAt}
                      </Text>
                    </Box>
                    {comment.commentAuthor === currentUser && (
                      <Popover placement='bottom-end'>
                        <PopoverTrigger>
                          <IconButton
                            icon={<FontAwesomeIcon icon={faEllipsis} />}
                            variant='ghost'
                            size='sm'
                            ml='auto'
                          />
                        </PopoverTrigger>
                        <PopoverContent width='fit-content'>
                          <PopoverArrow />
                          <PopoverHeader fontSize='sm'>
                            Manage Comment
                          </PopoverHeader>
                          <PopoverBody>
                            <Button
                              colorScheme='red'
                              size='sm'
                              rounded='full'
                              onClick={() =>
                                handleRemoveComment(ride._id, comment._id)
                              }
                            >
                              Remove Comment
                            </Button>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    )}
                  </Flex>
                  <Text mt={2}>{comment.commentText}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default RideList;
