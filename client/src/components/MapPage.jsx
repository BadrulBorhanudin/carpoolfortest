import { useQuery } from '@apollo/client';
import { GET_RIDES } from '../utils/queries';
import RidesMap from './MapComponent';

const RidesList = () => {
  const { loading, error, data } = useQuery(GET_RIDES);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  console.log('Rides data:', data);

  return (
    <div>
      {data && data.getRides && data.getRides.length > 0 ? (
        <RidesMap rides={data.getRides} />
      ) : (
        <p>No rides available</p>
      )}
    </div>
  );
};

export default RidesList;
