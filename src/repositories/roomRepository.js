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
        return await Room.findOne({ id });
    }

    async update(id, roomData) {
        return await Room.findOneAndUpdate({ id }, roomData, { new: true });
    }

    async delete(id) {
        return await Room.findOneAndDelete({ id });
    }
}

module.exports = new RoomRepository();
