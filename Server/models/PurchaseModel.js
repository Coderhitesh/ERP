const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Item Schema for the purchase order
const PurchaseItemSchema = new Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true }  
}, { _id: false });

// Purchase Order Schema
const PurchaseOrderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },  
  quotationId: { type: Schema.Types.ObjectId, ref: 'Quotation' }, 
  performaInvoiceId: { type: Schema.Types.ObjectId, ref: 'PerformaInvoice' }, 
  items: [PurchaseItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  Roles:[{type: String}],

  paymentTerms: { type: String, required: true } 
},{timestamps:true});
module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);  
// Create the Purchase Order model
const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);

module.exports = PurchaseOrder;
