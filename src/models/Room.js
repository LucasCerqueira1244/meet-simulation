const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const roomSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    descriptions: { type: String, default: null },
    capacity: { type: Number, required: true },
    isActivate: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'createdAt' } });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
