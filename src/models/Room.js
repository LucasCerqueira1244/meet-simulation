const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const messageSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // ID do usuário que enviou a mensagem
    content: { type: String, required: true }, // Conteúdo da mensagem
    createdAt: { type: Date, default: Date.now }, // Data de criação da mensagem
});

const roomSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    descriptions: { type: String, default: null },
    capacity: { type: Number, required: true },
    isActivate: { type: Boolean, default: true },
    participants: [{ type: String }],
    messages: [messageSchema],
}, { timestamps: { createdAt: 'createdAt' } });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
