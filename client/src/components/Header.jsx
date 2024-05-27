import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  ButtonGroup,
  useDisclosure,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  useOutsideClick,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import Auth from '../utils/auth';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Logo from '../assets/logo.svg';
import Navigation from './Navigation';

const Header = () => {
  const [selectedTab, setSelectedTab] = useState(0);
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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const popoverRef = useRef();

  useOutsideClick({
    ref: popoverRef,
    handler: () => setIsPopoverOpen(false),
  });

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Layout>
      <Flex
        as='nav'
        p='2'
        justifyContent='space-between'
        alignItems='center'
        height='61px'
        position='relative'
      >
        <IconButton
          icon={<FontAwesomeIcon icon={faBarsStaggered} size='1x' />}
          display={{ base: 'flex', md: 'none' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          variant='unstyled'
          aria-label='Open Menu'
        />

        <Link to='/' style={{ textDecoration: 'none' }}>
          <Flex
            alignItems='center'
            ml={{ base: Auth.loggedIn() ? '0' : '-12', md: '0' }}
          >
            <img src={Logo} alt='Logo' width='25px' />
            <Heading
              as='h1'
              size='lg'
              fontWeight='700'
              color='#150035'
              ml='2'
              mr='2'
              display={{
                base: Auth.loggedIn() ? 'block' : 'none',
                md: 'block',
              }}
            >
              CarPoolHub
            </Heading>
          </Flex>
        </Link>

        <Box display={{ base: 'none', md: 'flex' }} flex='1'>
          <Navigation
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            isMobile={false}
          />
        </Box>

        <Flex>
          <ButtonGroup size='md'>
            {Auth.loggedIn() ? (
              <Flex align='center'>
                <Popover
                  isOpen={isPopoverOpen}
                  onClose={() => setIsPopoverOpen(false)}
                  initialFocusRef={popoverRef}
                  placement='bottom-start'
                >
                  <PopoverTrigger>
                    <Avatar
                      size='sm'
                      name={Auth.getProfile().data.username}
                      cursor='pointer'
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    />
                  </PopoverTrigger>
                  <PopoverContent ref={popoverRef} width='fit-content'>
                    <PopoverArrow />
                    <PopoverHeader fontWeight='semibold'>
                      <Flex align='center'>
                        <Avatar
                          name={Auth.getProfile().data.username}
                          cursor='pointer'
                        />
                        <Link
                          to='/me'
                          style={{ textDecoration: 'none', marginLeft: '8px' }}
                        >
                          <Text>
                            {Auth.getProfile().data.username}'s profile
                          </Text>
                        </Link>
                      </Flex>
                    </PopoverHeader>
                    <PopoverBody align='center'>
                      <Button borderRadius='full' onClick={logout}>
                        Logout
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                <Box
                  ml={2}
                  p={2}
                  bg='#f5f5f5'
                  borderRadius='full'
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='center'
                >
                  <Text fontSize='lg' fontWeight='bold'>
                    Hi, {Auth.getProfile().data.username}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <>
                <Button
                  variant='outline'
                  borderRadius='full'
                  mr='px'
                  onClick={onLoginOpen}
                  bg='white'
                  color='gray.700'
                  _hover={{ bg: 'gray.100', color: 'gray.700' }}
                  _active={{ bg: 'gray.300', color: 'gray.700' }}
                >
                  Login
                </Button>
                <Login isOpen={isLoginOpen} onClose={onLoginClose} />
                <Button
                  borderRadius='full'
                  ml='px'
                  onClick={onSignupOpen}
                  bg='blue.500'
                  color='white'
                  _hover={{ bg: 'blue.600', color: 'white' }}
                  _active={{ bg: 'blue.700', color: 'white' }}
                >
                  Sign Up
                </Button>
                <Signup isOpen={isSignupOpen} onClose={onSignupClose} />
              </>
            )}
          </ButtonGroup>
        </Flex>
      </Flex>

      <Collapse in={isMenuOpen} animateOpacity>
        <Navigation
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isMobile={true}
          setIsMenuOpen={setIsMenuOpen}
        />
      </Collapse>
    </Layout>
  );
};

export default Header;
