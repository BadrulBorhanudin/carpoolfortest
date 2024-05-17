import React from 'react';
import { Link } from 'react-router-dom';

const RideList = ({ rides, title, showTitle = true, showUsername = true }) => {
  if (!rides.length) {
    return <h3>No Rides Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {rides &&
        rides.map((ride) => (
          <div key={ride._id} className='card mb-3'>
            <h4 className='card-header bg-primary text-light p-2 m-0'>
              {showUsername ? (
                <Link
                  className='text-light'
                  to={`/profiles/${ride.rideAuthor}`}
                >
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
            </h4>
            <div className='card-body bg-light p-2'>
              <p>Origin: {ride.origin}</p>
              <p>Destination: {ride.destination}</p>
              <p>Date: {ride.date}</p>
              <p>Time: {ride.time}</p>
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
