import { useQuery } from '@apollo/client';

import RideList from '../components/RideList';
import RideForm from '../components/RideForm';

import { QUERY_RIDES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RIDES);
  const rides = data?.rides || [];

  return (
    <main>
      <div className='flex-row justify-center'>
        <div
          className='col-12 col-md-10 mb-3 p-3'
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <RideForm />
        </div>
        <div className='col-12 col-md-8 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RideList rides={rides} title='Available Rides...' />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
