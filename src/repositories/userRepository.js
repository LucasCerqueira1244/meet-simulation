const User = require('../models/User');

class UserRepository {
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findByEmail(email) {
        const user = await User.findOne({ email });
        console.log('Usuário encontrado:', user);
        return user;
    }

    async findAll() {
        return await User.find();
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = new UserRepository();
