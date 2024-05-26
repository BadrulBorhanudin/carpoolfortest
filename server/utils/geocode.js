require('dotenv').config();
const axios = require('axios');
const GeocodeCache = require('../models/GeocodeCache');

const geocodeAddress = async (address) => {
  const apiKey = process.env.LOCATIONIQ_API_KEY;
  if (!apiKey) {
    throw new Error('Missing LocationIQ API key');
  }

  try {
    console.log(`Geocoding address: ${address}`);
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
        address
      )}&format=json`
    );
    if (!response.data || response.data.length === 0) {
      throw new Error('No results found for this address.');
    }

    const locationData = response.data[0];
    console.log(
      `Geocoded address: ${address}, lat: ${locationData.lat}, lon: ${locationData.lon}`
    );
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
    throw new Error('Error geocoding address');
  }
};

const getCoordinates = async (address) => {
  try {
    console.log(`Checking cache for address: ${address}`);
    let cachedResult = await GeocodeCache.findOne({ address });
    if (cachedResult) {
      console.log(`Cache hit for address: ${address}`);
      return { lat: cachedResult.lat, lon: cachedResult.lon };
    }

    console.log(`Cache miss for address: ${address}. Fetching from API.`);
    const locationData = await geocodeAddress(address);

    console.log(`Attempting to save address to cache: ${address}`);
    await GeocodeCache.create({
      address,
      lat: locationData.lat,
      lon: locationData.lon,
    });
    console.log(`Address successfully saved to cache: ${address}`);

    return locationData;
  } catch (error) {
    console.error(`Error in getCoordinates for address: ${address}`, error);
    throw error;
  }
};

const geocodeAddressesWithDelay = async (addresses, delay = 2000) => {
  const results = [];
  for (const address of addresses) {
    console.log(`Processing address: ${address}`);
    const data = await getCoordinates(address);
    if (data) {
      results.push(data);
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  console.log('Geocode results:', results);
  return results;
};

module.exports = { getCoordinates, geocodeAddressesWithDelay };
