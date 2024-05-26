// import { useEffect } from 'react';
// import { useMutation } from '@apollo/client';
// import { GEOCODE_ADDRESS } from '../utils/mutations';

// const useGeocodeAddresses = (rides) => {
//   const [geocodeAddress] = useMutation(GEOCODE_ADDRESS);

//   useEffect(() => {
//     const geocodeAddresses = async () => {
//       for (const ride of rides) {
//         try {
//           const originResponse = await geocodeAddress({
//             variables: { address: ride.origin },
//           });
//           const destinationResponse = await geocodeAddress({
//             variables: { address: ride.destination },
//           });

//           console.log(
//             `Origin of ride ${ride._id}:`,
//             originResponse.data.geocodeAddress
//           );
//           console.log(
//             `Destination of ride ${ride._id}:`,
//             destinationResponse.data.geocodeAddress
//           );

//           // Add a delay between geocoding requests
//           await new Promise((resolve) => setTimeout(resolve, 2000));
//         } catch (error) {
//           console.error(
//             `Error geocoding addresses for ride ${ride._id}:`,
//             error.message
//           );
//         }
//       }
//     };

//     if (rides.length) {
//       geocodeAddresses();
//     }
//   }, [rides, geocodeAddress]);
// };

// export default useGeocodeAddresses;
