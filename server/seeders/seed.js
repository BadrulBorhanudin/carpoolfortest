const db = require('../config/connection');
const { User, Ride, GeocodeCache } = require('../models');
const userSeeds = require('./userSeeds.json');
const rideSeeds = require('./rideSeeds.json');
const geocodeSeeds = require('./geocodeSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean Ride collection
    await cleanDB('Ride', 'rides');

    // Clean User collection
    await cleanDB('User', 'users');

    // Clean GeocodeCache collection
    await cleanDB('GeocodeCache', 'geocodecaches');

    // Seed User collection
    await User.create(userSeeds);

    // Seed Ride collection
    for (let i = 0; i < rideSeeds.length; i++) {
      const { _id, rideAuthor } = await Ride.create(rideSeeds[i]);
      await User.findOneAndUpdate(
        { username: rideAuthor },
        { $addToSet: { rides: _id } }
      );
    }

    // Seed GeocodeCache collection
    await GeocodeCache.create(geocodeSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
