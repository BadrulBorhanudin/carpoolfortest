import { Box, Heading } from '@chakra-ui/react';

const Hero = () => {
  return (
    <Box
      position='relative'
      bgImage="url('../src/assets/hero.png')"
      bgSize='cover'
      bgRepeat='no-repeat'
      h='38vh'
      display='flex'
      justifyContent='center'
      alignItems='flex-end'
      rounded='3xl'
      overflow='hidden'
      mt={{ base: '-1', md: '4' }}
    >
      {/* Overlay */}
      <Box
        position='absolute'
        top='0'
        left='0'
        right='0'
        bottom='0'
        bg='rgba(32, 32, 32, 0.5)'
        zIndex='1'
      />

      {/* Content */}
      <Box position='relative' zIndex='2' p={4}>
        <Heading
          as='h1'
          size={{ base: 'lg', md: 'xl' }}
          mb={{ base: 1, md: 2 }}
          textAlign='left'
          color='whitesmoke'
        >
          Connect with your <span style={{ color: '#42a4ff' }}>community,</span>
          <br />
          <span style={{ color: '#42a4ff' }}>one</span> ride at a time.
        </Heading>
      </Box>
    </Box>
  );
};

export default Hero;
