const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    trucks: [{type: Types.ObjectId, ref: 'Truck'}],
    loads: [{type: Types.ObjectId, ref: 'Load'}],
    photo: {contentType: String, data: Buffer }
});

module.exports = model('User', schema);