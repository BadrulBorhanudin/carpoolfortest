import { Box } from '@chakra-ui/react';

// Layout component to provide consistent styling and structure to the application
const Layout = ({ children }) => {
  return (
    <Box>
      {/* Container box to center content and set max width */}
      <Box maxW='900px' mx='auto' p={2} bg='#f0f0f0'>
        {/* Render child components passed to the Layout */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
