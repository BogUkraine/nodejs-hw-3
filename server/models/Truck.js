const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  created_by: {type: Types.ObjectId, required: true, ref: 'User'},
  assigned_to: {type: Types.ObjectId, ref: 'User', default: null},
  name: {type: String, required: true},
  status: {type: String, required: true},
  sizes: {
    width: {type: Number, required: true},
    height: {type: Number, required: true},
    length: {type: Number, required: true},
  },
  weight: {type: Number, required: true},
  type: {type: String, required: true},
});

module.exports = model('Truck', schema);
