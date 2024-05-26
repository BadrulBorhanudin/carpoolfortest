// import React, { useEffect, useState } from 'react';
// import { useLazyQuery } from '@apollo/client';
// import { GET_RIDES } from '../utils/queries';

// const MapComponent = () => {
//   const [coordinates, setCoordinates] = useState([]);
//   const [getRides, { loading, data }] = useLazyQuery(GET_RIDES);

//   useEffect(() => {
//     getRides();
//   }, [getRides]);

//   useEffect(() => {
//     if (data && data.rides) {
//       const coords = data.rides
//         .map((ride) => {
//           if (ride && ride.origin && ride.destination) {
//             return {
//               origin: ride.originCoordinates,
//               destination: ride.destinationCoordinates,
//             };
//           }
//           return null;
//         })
//         .filter((coord) => coord !== null);
//       setCoordinates(coords);
//     }
//   }, [data]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!coordinates.length) {
//     return <p>No ride data available.</p>;
//   }

//   return (
//     <div>
//       <h1>Map Component</h1>
//       {coordinates.map((coord, index) => (
//         <div key={index}>
//           <p>Origin: {coord.origin}</p>
//           <p>Destination: {coord.destination}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MapComponent;
