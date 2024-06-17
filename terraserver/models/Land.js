const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Land schema
const landSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
  },
  size: {
    type: Number,
    required: true, // Size in square meters or any other unit
  },
  price: {
    type: Number,
    required: true,
  },
  ownershipType: {
    type: String,
    enum: ['Freehold', 'Leasehold'],
    required: true,
  },
  zoningType: {
    type: String,
    required: true,
  },
  utilities: {
    water: {
      type: Boolean,
      default: false,
    },
    electricity: {
      type: Boolean,
      default: false,
    },
    gas: {
      type: Boolean,
      default: false,
    },
    sewage: {
      type: Boolean,
      default: false,
    },
  },
  accessibility: {
    type: String,
    enum: ['Road', 'Rail', 'Air', 'Sea'],
    required: true,
  },
  legalDocuments: {
    type: [String],
  },
  images: {
    type: [String], // URLs to images
  },
  listedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Land model
const Land = mongoose.model('Land', landSchema);

module.exports = Land;
