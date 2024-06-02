import { Box, Heading } from '@chakra-ui/react';
import HeroImage from '../assets/hero.png';
import { motion } from 'framer-motion';


const MotionHeading = motion(Heading);
const MotionText = motion(Box);

const Hero = () => {
  return (
    <Box
      position='relative'
      bgImage={`url(${HeroImage})`}
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
        <MotionHeading
          as='h1'
          size={{ base: 'lg', md: 'xl' }}
          mb={{ base: 1, md: 2 }}
          textAlign='left'
          color='whitesmoke'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Connect with your{' '}
          <MotionText
            as='span'
            style={{ color: '#42a4ff' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            community,
          </MotionText>
          <br />
          <MotionText
            as='span'
            style={{ color: '#42a4ff' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            one
          </MotionText>{' '}
          ride at a time.
        </MotionHeading>
      </Box>
    </Box>
  );
};

export default Hero;

