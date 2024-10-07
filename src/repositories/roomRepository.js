// roomRepository.js
const Room = require('../models/Room');

class RoomRepository {
    async create(roomData) {
        const room = new Room(roomData);
        return await room.save();
    }

    async findAll() {
        return await Room.find();
    }

    async findById(id) {
        return await Room.findOne({ _id: id });
    }

    async update(id, roomData) {
        return await Room.findOneAndUpdate({ _id: id }, roomData, { new: true });
    }

    async delete(id) {
        return await Room.findOneAndDelete({ _id: id });
    }

    async addParticipant(roomId, userId) {
        const room = await this.findById(roomId);
        if (!room) {
            throw new Error('Sala não encontrada');
        }

        if (!room.participants) {
            room.participants = [];
        }

        if (!room.participants.includes(userId)) {
            room.participants.push(userId);
            await room.save();
        }

        return room;
    }
}

module.exports = new RoomRepository();
