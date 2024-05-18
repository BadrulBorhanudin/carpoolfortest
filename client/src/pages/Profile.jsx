import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import RideForm from '../components/RideForm';
import RideList from '../components/RideList';

import { QUERY_USER, QUERY_ME, QUERY_RIDES } from '../utils/queries';
import { REMOVE_RIDE } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const [removeRide] = useMutation(REMOVE_RIDE, {
    refetchQueries: [
      { query: QUERY_RIDES },
      {
        query: userParam ? QUERY_USER : QUERY_ME,
        variables: { username: userParam },
      },
    ],
  });

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/me' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleRemoveRide = async (rideId) => {
    try {
      await removeRide({ variables: { rideId } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className='flex-row justify-center mb-3'>
        <h2 className='col-12 col-md-10 bg-dark text-light p-3 mb-5'>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className='col-12 col-md-10 mb-5'>
          <RideList
            rides={user.rides}
            title={`${user.username}'s rides...`}
            showTitle={false}
            showUsername={false}
            handleRemoveRide={userParam ? null : handleRemoveRide} // Pass handleRemoveRide only if it's the user's own profile
          />
        </div>
        {!userParam && (
          <div
            className='col-12 col-md-10 mb-3 p-3'
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <RideForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
