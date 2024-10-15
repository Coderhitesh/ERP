const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Address Schema for the supplier
const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

// Supplier Schema
const SupplierSchema = new Schema({
  supplierName: { type: String, required: true, unique: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  gstNumber: { type: String, required: true }, // GST number for tax purposes
  panNumber: { type: String, required: true }, // PAN number for tax purposes
  address: { type: AddressSchema, required: true },
  paymentTerms: { type: String, required: true }, 
  Roles:[{type: String}],

},{timestamps:true});



// Create the Supplier model
const Supplier = mongoose.model('Supplier', SupplierSchema);

module.exports = Supplier;
