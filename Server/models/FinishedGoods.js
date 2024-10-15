const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinishedGoodSchema = new Schema({
    productName: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, min: 0 },
    unitPrice: { type: Number, required: true, min: 0 },
    semiFinishedGoods: [{ type: Schema.Types.ObjectId, ref: 'SemiFinishedGood', required: true }],
    productionDate: { type: Date, required: true },
    expirationDate: { type: Date }, 
    Roles:[{type: String}]
   
  },{timestamps:true});


const FinishedGood = mongoose.model('FinishedGood', FinishedGoodSchema);
module.exports = FinishedGood;