const { Schema, model } = require('mongoose');

const geocodeCacheSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  lat: {
    type: Number,
    required: true,

  },
  lon: {
    type: Number,
    required: true,
  },
});

const GeocodeCache = model('GeocodeCache', geocodeCacheSchema);

module.exports = GeocodeCache;
