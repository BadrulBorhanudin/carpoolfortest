require('dotenv').config();
const axios = require('axios');
// const { ApolloError } = require('apollo-server-express');

const geocodeAddress = async (address) => {
  const apiKey = process.env.LOCATIONIQ_API_KEY;
  if (!apiKey) {
    throw new Error('Missing LocationIQ API key');
  }

  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
        address
      )}&format=json`
    );
    if (!response.data || response.data.length === 0) {
      throw new Error('No results found for this address.');
    }

    const locationData = response.data[0];
    return {
      lat: parseFloat(locationData.lat),
      lon: parseFloat(locationData.lon),
    };
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log(`Rate limit exceeded for address: ${address}`);
    } else {
      console.error('LocationIQ API Error:', error.message);
    }
    throw new ApolloError('Error geocoding address');
  }
};

const geocodeAddressesWithDelay = async (addresses, delay = 2000) => {
  const results = [];
  for (const address of addresses) {
    const data = await geocodeAddress(address);
    if (data) {
      results.push(data);
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return results;
};

module.exports = { geocodeAddress, geocodeAddressesWithDelay };
