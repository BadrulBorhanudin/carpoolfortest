import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      rides {
        _id
        origin
        destination
        date
        time
        isDriver
        createdAt
      }
    }
  }
`;

export const QUERY_RIDES = gql`
  query getRides {
    rides {
      _id
      origin
      destination
      date
      time
      rideAuthor
      isDriver
      createdAt
    }
  }
`;

export const QUERY_SINGLE_RIDE = gql`
  query getSingleRide($rideId: ID!) {
    ride(rideId: $rideId) {
      _id
      origin
      destination
      date
      time
      rideAuthor
      isDriver
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      rides {
        _id
        origin
        destination
        date
        time
        rideAuthor
        isDriver
        createdAt
      }
    }
  }
`;