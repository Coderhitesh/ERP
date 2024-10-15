const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 }
}, { _id: false });

const ManufactureOrderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  products: [ProductSchema],
  orderDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },

  expectedCompletionDate: { type: Date },
  actualCompletionDate: { type: Date },
  Roles:[{type: String}]

},{timestamps:true});


// Create the Manufacture Order model
const ManufactureOrder = mongoose.model('ManufactureOrder', ManufactureOrderSchema);

module.exports = ManufactureOrder;
