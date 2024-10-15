const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Item Schema for the quotation
const ItemSchema = new Schema({
    item_id: {},
    description: { type: String },
    quantity: { type: Number, required: true },
    anyDiscount: {
        type: String
    }

}, { _id: false });

// Quotation Schema
const QuotationSchema = new Schema({
    BusinessOwnerDetails:{
        type: Schema.Types.ObjectId, ref: 'Business', required: true 
    },
    quotationNumber: { type: String, required: true, unique: true },  //QUA
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    items: [ItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'],
        default: 'Draft'
    },
    Roles:[{type: String}],

    validityPeriod: { type: Date, required: true }   // Validation date
}, { timestamps: true });


// Create the Quotation model
const Quotation = mongoose.model('Quotation', QuotationSchema);

module.exports = Quotation;
