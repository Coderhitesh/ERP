const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SemiFinishedGoodSchema = new Schema({
    productName: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, min: 0 },
    unitPrice: { type: Number, required: true, min: 0 },
    rawMaterials: [{ type: Schema.Types.ObjectId, ref: 'RawMaterial', required: true }],
    productionDate: { type: Date, required: true },
    expirationDate: { type: Date },
    Roles:[{type: String}],

}, { timeStamps: true });



// Create the Semi-Finished Good model
const SemiFinishedGood = mongoose.model('SemiFinishedGood', SemiFinishedGoodSchema);

module.exports = SemiFinishedGood;
