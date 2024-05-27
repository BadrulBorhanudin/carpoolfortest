import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box>
      <Box maxW='900px' mx='auto' p={2} bg='#f0f0f0'>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
