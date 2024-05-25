import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box>
      <Box maxW='900px' mx='auto' p={2} bg='#F3F2F4'>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
