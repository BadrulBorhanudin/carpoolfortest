const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    rides: [Ride]!
  }

  type Ride {
    _id: ID
    origin: String
    destination: String
    date: String
    time: String
    rideAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    rides(username: String): [Ride]
    ride(rideId: ID!): Ride
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRide(origin: String!, destination: String!, date: String!, time: String!): Ride
    addComment(rideId: ID!, commentText: String!): Ride
    removeRide(rideId: ID!): Ride
    removeComment(rideId: ID!, commentId: ID!): Ride
  }
`;

module.exports = typeDefs;