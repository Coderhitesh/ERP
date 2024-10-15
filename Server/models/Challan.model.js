const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Challan Schema
const ChallanSchema = new Schema({
  challanNumber: { type: String, required: true, unique: true }, // Unique identifier for the challan
  date: { type: Date, default: Date.now }, // Date of issuance
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true }, // Reference to the Client model
  items: [{
    description: { type: String, required: true }, // Description of the item
    quantity: { type: Number, required: true, min: 1 }, // Quantity of the item
    unitPrice: { type: Number, required: true, min: 0 }, // Price per unit
    totalPrice: { type: Number, required: true, min: 0 } // Total price for the item
  }],
  totalAmount: { type: Number, required: true, min: 0 }, // Total amount for the challan
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
  Roles:[{type: String}],

  updatedAt: { type: Date, default: Date.now } // Timestamp for last update
});

// Middleware to update the updatedAt field before saving
ChallanSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Challan model
const Challan = mongoose.model('Challan', ChallanSchema);

module.exports = Challan;
