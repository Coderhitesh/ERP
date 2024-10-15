const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Address Schema for the business
const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

// Business Schema
const BusinessSchema = new Schema({
  businessLogo: {
    type: String,
    required: true
  },
  businessName: { type: String, required: true, unique: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  gstNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  discountRules: {
    percentage: { type: Number, min: 0, max: 100 },
    applicableOn: { type: String, enum: ['All', 'Specific Products'], default: 'All' },
    startDate: { type: Date },
    endDate: { type: Date }
  },
  AllRoles:[{type: String}],

  paymentTerms: [{ type: String }] // Array to hold payment terms
}, { timestamps: true });

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;
