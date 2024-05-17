import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RIDE = gql`
  mutation addRide($origin: String!, $destination: String!) {
    addRide(origin: $origin, destination: $destination) {
      _id
      origin
      destination
      rideAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($rideId: ID!, $commentText: String!) {
    addComment(rideId: $rideId, commentText: $commentText) {
      _id
      origin
      destination
      rideAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
