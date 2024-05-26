require('dotenv').config();
const mongoose = require('mongoose');
const GeocodeCache = require('./GeocodeCache');

const checkCacheContent = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/car-pool-hub',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const cachedAddresses = await GeocodeCache.find({});
    console.log('Cached addresses retrieved:', cachedAddresses);

    const results = cachedAddresses.map((entry) => ({
      address: entry.address,
      lat: entry.lat,
      lon: entry.lon,
    }));

    if (results.length > 0) {
      console.log('Cached addresses:', results);
    } else {
      console.log('No address saved to cache log');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error checking cache content:', error);
  }
};

checkCacheContent();
