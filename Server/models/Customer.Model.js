const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
}, { _id: false });

const ContactSchema = new Schema({
    phone: { type: String,unique:true },
    email: { type: String, unique: true },
    secondaryPhone: { type: String },
    secondaryEmail: { type: String }
}, { _id: false });

const BusinessInfoSchema = new Schema({
    businessName: { type: String, required: true },
    businessCategory: { type: String, required: true },
    establishmentDate: { type: Date },
    head: { type: String },
    businessAddress: { type: AddressSchema }
}, { _id: false });

const CustomerSchema = new Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactDetails: { type: ContactSchema, required: true },
    businessInfo: { type: BusinessInfoSchema, required: true },
    additionalAddress: { type: AddressSchema },
    clientStatus: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
    Roles:[{type: String}],
    followUpDate:{ type: Date },
    followUp:{ type: Boolean,default:false },
    comments: [{ type: String }],
}, { timestamps: true });


const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
