import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navigation = ({
  selectedTab,
  setSelectedTab,
  isMobile,
  setIsMenuOpen,
}) => {
  // Handle click events for navigation buttons
  const handleClick = (tabIndex) => {
    setSelectedTab(tabIndex);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Define button styles based on the selected tab and whether the view is mobile
  const buttonStyle = (tabIndex) => ({
    variant: 'ghost',
    color: selectedTab === tabIndex ? '#3981CA' : '#6B6C6D',
    fontWeight: 'bold',
    fontSize: 'xl',
    _focus: { boxShadow: 'none' },
    _hover: { textDecoration: 'none', color: '#7B9FC4' },
    _active: { bg: 'transparent' },
    mx: isMobile ? 0 : 2,
    mb: isMobile ? 2 : 0,
    onClick: () => handleClick(tabIndex),
  });

  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justifyContent='center'
      flex='1'
    >
      {/* Navigation button for Home */}
      <Button as={Link} to='/' {...buttonStyle(0)}>
        Home
        {/* Highlight indicator for the selected tab */}
        {selectedTab === 0 && !isMobile && (
          <Box
            position='absolute'
            bottom='-10px'
            left='50%'
            transform='translateX(-50%)'
            width='30px'
            height='5px'
            bg='#3981CA'
            borderRadius='full'
            transition='all 0.3s ease'
          />
        )}
      </Button>
      {/* Navigation button for About */}
      <Button as={Link} to='/about' {...buttonStyle(1)}>
        About
        {/* Highlight indicator for the selected tab */}
        {selectedTab === 1 && !isMobile && (
          <Box
            position='absolute'
            bottom='-10px'
            left='50%'
            transform='translateX(-50%)'
            width='30px'
            height='5px'
            bg='#3981CA'
            borderRadius='full'
            transition='all 0.3s ease'
          />
        )}
      </Button>
      {/* Navigation button for Support */}
      <Button as={Link} to='/support' {...buttonStyle(2)}>
        Support
        {/* Highlight indicator for the selected tab */}
        {selectedTab === 2 && !isMobile && (
          <Box
            position='absolute'
            bottom='-10px'
            left='50%'
            transform='translateX(-50%)'
            width='30px'
            height='5px'
            bg='#3981CA'
            borderRadius='full'
            transition='all 0.3s ease'
          />
        )}
      </Button>
    </Flex>
  );
};

export default Navigation;
