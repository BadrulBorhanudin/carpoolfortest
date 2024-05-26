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
    isDriver: Boolean
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

  type CheckoutSession {
    id: ID!
  }

  type Geocode {
    lat: Float
    lon: Float
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
    addRide(origin: String!, destination: String!, date: String!, time: String!, isDriver: Boolean): Ride
    addComment(rideId: ID!, commentText: String!): Ride
    removeRide(rideId: ID!): Ride
    removeComment(rideId: ID!, commentId: ID!): Ride
    editComment(rideId: ID!, commentId: ID!, commentText: String!): Ride
    createCheckoutSession(donationAmount: Float!): CheckoutSession
    geocodeAddress(address: String!): Geocode
    geocodeMultipleAddresses(addresses: [String!]!): [Geocode]
  }
`;

module.exports = typeDefs;
