require('dotenv').config();
const { User, Ride } = require('../models');
const { signToken } = require('../utils/auth');
const CustomAuthenticationError = require('../utils/CustomAuthenticationError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate({
        path: 'rides',
        populate: 'comments',
      });
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate({
        path: 'rides',
        populate: 'comments',
      });
    },
    rides: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Ride.find(params).sort({ createdAt: -1 }).populate('comments');
    },
    ride: async (parent, { rideId }) => {
      return Ride.findOne({ _id: rideId }).populate('comments');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: 'rides',
          populate: 'comments',
        });
      }
      throw new CustomAuthenticationError('Could not authenticate user');
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
        throw new CustomAuthenticationError('User not found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new CustomAuthenticationError('Incorrect password');
      }

      const token = signToken(user);

      return { token, user };
    },
    addRide: async (
      parent,
      { origin, destination, date, time, isDriver },
      context
    ) => {
      if (context.user) {
        const ride = await Ride.create({
          origin,
          destination,
          date,
          time,
          isDriver,
          rideAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { rides: ride._id } }
        );

        return ride;
      }
      throw new CustomAuthenticationError(
        'You need to be logged in to add a ride'
      );
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
      throw new CustomAuthenticationError(
        'You need to be logged in to add a comment'
      );
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
      throw new CustomAuthenticationError(
        'You need to be logged in to remove a ride'
      );
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
      throw new CustomAuthenticationError(
        'You need to be logged in to remove a comment'
      );
    },
    editComment: async (
      parent,
      { rideId, commentId, commentText },
      context
    ) => {
      if (context.user) {
        const ride = await Ride.findOneAndUpdate(
          { _id: rideId, 'comments._id': commentId },
          { $set: { 'comments.$.commentText': commentText } },
          { new: true }
        );

        if (!ride) {
          throw new CustomAuthenticationError(
            'No ride found with the provided ID'
          );
        }

        return ride;
      }
      throw new CustomAuthenticationError(
        'You need to be logged in to edit a comment'
      );
    },
    createCheckoutSession: async (parent, { donationAmount }, context) => {
      if (context.user) {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'aud',
                product_data: {
                  name: 'Donation to CarPoolHub',
                },
                unit_amount: donationAmount * 100,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
        });
        return { id: session.id };
      }
      throw new CustomAuthenticationError(
        'You need to be logged in to create a checkout session'
      );
    },
  },
};

module.exports = resolvers;
