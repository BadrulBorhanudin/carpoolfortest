// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_RIDE } from '../utils/queries';

const SingleRide = () => {
  // Use `useParams()` to retrieve value of the route parameter `:rideId`
  const { id: rideId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RIDE, {
    // pass URL parameter
    variables: { rideId: rideId },
  });

  const ride = data?.ride || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='my-3'>
      <h3 className='card-header bg-dark text-light p-2 m-0'>
        {ride.rideAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          posted this ride on {ride.createdAt}
        </span>
      </h3>
      <div className='bg-light py-4'>
        <blockquote
          className='p-4'
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          Origin: {ride.origin} <br />
          Destination: {ride.destination} <br />
          Date: {ride.date} <br />
          Time: {ride.time}
        </blockquote>
      </div>

      <div className='my-5'>
        <CommentList comments={ride.comments} rideId={ride._id} />
      </div>
      <div className='m-3 p-4' style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm rideId={ride._id} />
      </div>
    </div>
  );
};

export default SingleRide;
