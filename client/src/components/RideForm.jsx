import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RIDE } from '../utils/mutations';
import { QUERY_RIDES, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const RideForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const [characterCountOrigin, setCharacterCountOrigin] = useState(0);
  const [characterCountDestination, setCharacterCountDestination] = useState(0);

  const [addRide, { error }] = useMutation(ADD_RIDE, {
    refetchQueries: [QUERY_RIDES, 'getRides', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addRide({
        variables: {
          origin,
          destination,
          rideAuthor: Auth.getProfile().data.username,
        },
      });

      setOrigin('');
      setDestination('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'origin' && value.length <= 280) {
      setOrigin(value);
      setCharacterCountOrigin(value.length);
    } else if (name === 'destination' && value.length <= 280) {
      setDestination(value);
      setCharacterCountDestination(value.length);
    }
  };

  return (
    <div>
      <h3>Plan your next ride</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCountOrigin === 280 ||
              characterCountDestination === 280 ||
              error
                ? 'text-danger'
                : ''
            }`}
          >
            Origin Character Count: {characterCountOrigin}/280
          </p>
          <p
            className={`m-0 ${
              characterCountOrigin === 280 ||
              characterCountDestination === 280 ||
              error
                ? 'text-danger'
                : ''
            }`}
          >
            Destination Character Count: {characterCountDestination}/280
          </p>
          <form
            className='flex-row justify-center justify-space-between-md align-center'
            onSubmit={handleFormSubmit}
          >
            <div className='col-12 col-lg-9'>
              <textarea
                name='origin'
                placeholder='Enter origin...'
                value={origin}
                className='form-input w-100'
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name='destination'
                placeholder='Enter destination...'
                value={destination}
                className='form-input w-100 mt-2'
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className='col-12 col-lg-3'>
              <button className='btn btn-primary btn-block py-3' type='submit'>
                Add Ride
              </button>
            </div>
            {error && (
              <div className='col-12 my-3 bg-danger text-white p-3'>
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to plan your rides. Please{' '}
          <Link to='/login'>login</Link> or <Link to='/signup'>signup.</Link>
        </p>
      )}
    </div>
  );
};

export default RideForm;
