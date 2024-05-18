import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from '../utils/mutations';
import { QUERY_RIDES } from '../utils/queries';
import Auth from '../utils/auth';

const RideList = ({
  rides,
  title,
  showTitle = true,
  showUsername = true,
  handleRemoveRide,
}) => {
  const [removeComment] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const handleRemoveComment = async (rideId, commentId) => {
    try {
      await removeComment({ variables: { rideId, commentId } });
    } catch (err) {
      console.error(err);
    }
  };

  if (!rides.length) {
    return <h3>No Rides Yet</h3>;
  }

  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {rides.map((ride) => (
        <div key={ride._id} className='card mb-3'>
          <h4 className='card-header bg-primary text-light p-2 m-0'>
            {showUsername ? (
              <Link className='text-light' to={`/profiles/${ride.rideAuthor}`}>
                {ride.rideAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  posted this ride on {ride.createdAt}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  You posted this ride on {ride.createdAt}
                </span>
              </>
            )}
            {handleRemoveRide && (
              <button
                className='btn btn-danger ml-3'
                onClick={() => handleRemoveRide(ride._id)}
              >
                Remove
              </button>
            )}
          </h4>
          <div className='card-body bg-light p-2'>
            <p>Origin: {ride.origin}</p>
            <p>Destination: {ride.destination}</p>
            <p>Date: {ride.date}</p>
            <p>Time: {ride.time}</p>
            {ride.comments &&
              ride.comments.map((comment) => (
                <div
                  key={comment._id}
                  className='p-2 m-2 border border-dark rounded'
                >
                  <p>{comment.commentText}</p>
                  <p>
                    by {comment.commentAuthor} on {comment.createdAt}
                  </p>
                  {Auth.loggedIn() && currentUser === comment.commentAuthor && (
                    <button
                      className='btn btn-danger'
                      onClick={() => handleRemoveComment(ride._id, comment._id)}
                    >
                      Remove Comment
                    </button>
                  )}
                </div>
              ))}
          </div>
          <Link
            className='btn btn-primary btn-block btn-squared'
            to={`/rides/${ride._id}`}
          >
            Join the discussion on this ride.
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RideList;
