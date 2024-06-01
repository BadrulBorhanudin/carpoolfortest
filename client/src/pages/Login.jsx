import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Signup from './Signup';
import { useDisclosure } from '@chakra-ui/react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Alert,
  AlertIcon,
  Box,
  CloseButton,
  Flex,
  InputGroup,
  InputRightElement,
  Text,
  Link,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Auth from '../utils/auth';


const Login = ({ isOpen, onOpen, onClose }) => {
  // State to manage form input and visibility of password
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [showPassword, setShowPassword] = useState(false);

  // useDisclosure hook to manage Signup modal state
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  // Handle input changes in the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission for login
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      onClose();
    } catch (e) {
      console.error(e);
    }
    // Reset form state after submission
    setFormState({
      email: '',
      password: '',
    });
  };

  // Toggle password visibility
  const handlePasswordToggle = () => setShowPassword(!showPassword);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        px={{ base: 5, md: 0 }}
        py={{ base: 3, md: 0 }}
      >
        <ModalOverlay />
        <ModalContent width={{ base: '90%' }}>
          <ModalHeader color='gray.700'>Welcome Back</ModalHeader>
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            onClick={onClose}
          />
          <ModalBody>
            {data ? (
              <Box mb='15'>
                Success! You may now head{' '}
                <Link to='/'>back to the homepage.</Link>
              </Box>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Input
                  rounded='full'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  value={formState.email}
                  onChange={handleChange}
                  mb={4}
                />
                <InputGroup size='md' mb={4}>
                  <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    name='password'
                    value={formState.password}
                    onChange={handleChange}
                    rounded='full'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={handlePasswordToggle}
                      variant='ghost'
                      _focus={{ boxShadow: 'none' }}
                      _hover={{ backgroundColor: 'transparent' }}
                      _active={{ backgroundColor: 'transparent' }}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Flex justify='center' mb='15px'>
                  <Button
                    colorScheme='blue'
                    type='submit'
                    rounded='full'
                    width='100%'
                    variant='solid'
                  >
                    Login
                  </Button>
                </Flex>
                <Flex justify='center' mb='2'>
                  <Text>
                    New to CarPoolHub?{' '}
                    <Button
                      variant='link'
                      colorScheme='blue'
                      onClick={() => {
                        onClose();
                        onSignupOpen();
                      }}
                    >
                      Sign Up
                    </Button>
                  </Text>
                </Flex>
              </form>
            )}
            {/* Display error message if login fails */}
            {error && (
              <Alert status='error' mt={4}>
                <AlertIcon />
                {error.message}
              </Alert>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Include Signup component for user registration */}
      <Signup
        isOpen={isSignupOpen}
        onOpen={onSignupOpen}
        onClose={onSignupClose}
      />
    </>
  );
};

export default Login;
