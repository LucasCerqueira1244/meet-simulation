const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = {
    async register(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log('Senha criada: ' + hashedPassword);
        return await UserRepository.create({ ...data, password: hashedPassword });
    },

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user };
        }
        throw new Error('Credenciais inválidas');
    },

    async findByEmail(email) {
        return await UserRepository.findByEmail(email);
    },

    async findAll() {
        return await UserRepository.findAll();
    },

    async update(id, data) {
        return await UserRepository.update(id, data);
    },

    async delete(id) {
        return await UserRepository.delete(id);
    }
};

module.exports = userService;
