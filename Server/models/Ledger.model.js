const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Ledger Schema
const LedgerSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true }, // Unique identifier for the transaction
    date: { type: Date, default: Date.now }, // Date of the transaction
    description: { type: String, required: true }, // Description of the transaction
    amount: { type: Number, required: true, min: 0 }, // Amount of the transaction
    type: { type: String, enum: ['Debit', 'Credit'], required: true }, // Type of transaction
    client: { type: Schema.Types.ObjectId, ref: 'Client' }, // Optional reference to the Client model
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' }, // Optional reference to the Supplier model
    createdAt: { type: Date, default: Date.now }, // Timestamp for creation
    Roles:[{type: String}],

    updatedAt: { type: Date, default: Date.now } // Timestamp for last update
  });
  
  // Middleware to update the updatedAt field before saving
  LedgerSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  // Create the Ledger model
  const Ledger = mongoose.model('Ledger', LedgerSchema);
  
  module.exports = Ledger;
  