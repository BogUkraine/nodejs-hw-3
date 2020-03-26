const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    created_by: {type: Types.ObjectId, required: true, ref: 'User'},
    assigned_to: {type: Types.ObjectId, required: true, ref: 'User'},
    status: {type: String, required: true},
    type: {type: String, required: true}
});

module.exports = model('Truck', schema);