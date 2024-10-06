const UserModel = require('../models/User');

class UserRepository {
    async create(data) {
        const user = new UserModel(data);
        return await user.save();
    }

    async findById(id) {
        return await UserModel.findById(id);
    }

    async findByUsername(username) {
        return await UserModel.findOne({ username });
    }

    async update(id, data) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await UserModel.findByIdAndDelete(id);
    }

    async findAll() {
        return await UserModel.find();
    }
}

module.exports = new UserRepository();
