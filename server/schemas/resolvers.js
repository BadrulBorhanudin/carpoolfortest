const { User, Ride } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('rides');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('rides');
    },
    rides: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Ride.find(params).sort({ createdAt: -1 });
    },
    ride: async (parent, { rideId }) => {
      return Ride.findOne({ _id: rideId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('rides');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addRide: async (parent, { origin, destination, date, time }, context) => {
      if (context.user) {
        const ride = await Ride.create({
          origin,
          destination,
          date,
          time,
          rideAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { rides: ride._id } }
        );

        return ride;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addComment: async (parent, { rideId, commentText }, context) => {
      if (context.user) {
        return Ride.findOneAndUpdate(
          { _id: rideId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeRide: async (parent, { rideId }, context) => {
      if (context.user) {
        const ride = await Ride.findOneAndDelete({
          _id: rideId,
          rideAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { rides: ride._id } }
        );

        return ride;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { rideId, commentId }, context) => {
      if (context.user) {
        return Ride.findOneAndUpdate(
          { _id: rideId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
