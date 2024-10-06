const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = {
    async register(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await UserRepository.create({ ...data, password: hashedPassword });
    },

    async login(username, password) {
        const user = await UserRepository.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user };
        }
        throw new Error('Credenciais inválidas');
    },
};

module.exports = userService;
