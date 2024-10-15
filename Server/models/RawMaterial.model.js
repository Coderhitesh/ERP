const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Raw Material Schema
const RawMaterialSchema = new Schema({
  materialName: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, min: 0 },
  unitPrice: { type: Number, required: true, min: 0 },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true }, 
  unitOfMeasurement: { type: String, required: true },
  storageLocation: { type: String }, 
  Roles:[{type: String}],

});

// Create the Raw Material model
const RawMaterial = mongoose.model('RawMaterial', RawMaterialSchema);

module.exports = RawMaterial;
