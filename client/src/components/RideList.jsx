import { useRef, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
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
  VStack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleDot,
  faCircle,
  faMapMarkerAlt,
  faCalendarAlt,
  faCar,
  faPersonWalkingLuggage,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { REMOVE_RIDE } from '../utils/mutations';
import { QUERY_RIDES } from '../utils/queries';
import Auth from '../utils/auth';
import CommentAvatar from '../components/CommentAvatar';
import GoogleMapsIcon from '../assets/google-maps-svgrepo-com.svg';

// Function to truncate text to a specified maximum length
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const RideList = ({
  rides,
  showTitle = true,
  showUsername = true,
  showCommentAvatar = true,
  showNoRideMessage = true,
}) => {
  // Define the mutation for removing a ride
  const [removeRide] = useMutation(REMOVE_RIDE, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const toast = useToast();
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const popoverRef = useRef();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Close popover when clicking outside of it
  useOutsideClick({
    ref: popoverRef,
    handler: () => setOpenPopoverId(null),
  });

  // Update screen width on window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle ride removal and show toast notifications
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

  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  return (
    <Box>
      {rides.map((ride) => {
        // Generate Google Maps URL for the ride
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
          ride.origin
        )}&destination=${encodeURIComponent(ride.destination)}`;
        return (
          <Box
            key={ride._id}
            borderColor='gray.300'
            borderWidth='1px'
            borderRadius='3xl'
            overflow='hidden'
            mb={4}
          >
            <Flex
              alignItems='center'
              justifyContent='space-between'
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
                    isOpen={openPopoverId === ride._id}
                    onClose={() => setOpenPopoverId(null)}
                  >
                    <PopoverTrigger>
                      <IconButton
                        icon={<FontAwesomeIcon icon={faEllipsis} />}
                        variant='ghost'
                        size='md'
                        left='8px'
                        onClick={() =>
                          setOpenPopoverId(
                            openPopoverId === ride._id ? null : ride._id
                          )
                        }
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
              <Divider mb='2' orientation='horizontal' borderColor='gray.300' />
              <Flex alignItems='center'>
                <Box position='relative' mr={3} ml={-0.3}>
                  <FontAwesomeIcon icon={faCircleDot} color='#2C7A7B' />
                </Box>
                <Box>
                  <Text color='gray.500' fontSize='sm'>
                    Origin
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {truncateText(
                      ride.origin,
                      screenWidth < 768 ? 30 : screenWidth < 1024 ? 60 : 80
                    )}
                  </Text>
                </Box>
              </Flex>
              <VStack spacing={2} align='start' ml={1} mt={-2} mb={-2}>
                <FontAwesomeIcon
                  icon={faCircle}
                  color='#BDBDBD'
                  style={{ fontSize: '8px' }}
                />
                <FontAwesomeIcon
                  icon={faCircle}
                  color='#BDBDBD'
                  style={{ fontSize: '8px' }}
                />
              </VStack>
              <Flex alignItems='center' ml={0.5}>
                <Box position='relative' mr={3.5}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} color='#B22222' />
                </Box>
                <Box>
                  <Text color='gray.500' fontSize='sm'>
                    Destination
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {truncateText(
                      ride.destination,
                      screenWidth < 768 ? 30 : screenWidth < 1024 ? 60 : 80
                    )}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='center' mt={3}>
                <Box position='relative' mr={3}>
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
                <Box position='relative' ml={6} mr={3}>
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
                <Box ml='auto' display='flex' alignItems='center'>
                  <a
                    href={googleMapsUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      src={GoogleMapsIcon}
                      alt='Google Maps'
                      style={{ height: '36px', marginRight: '0.3rem' }}
                    />
                  </a>
                </Box>
              </Flex>
              {showCommentAvatar && (
                <CommentAvatar comments={ride.comments} rideId={ride._id} />
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default RideList;
