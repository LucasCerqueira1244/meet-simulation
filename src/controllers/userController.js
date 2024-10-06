const userService = require('../services/userService');

class UserController {
    async register(req, res) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const { token, user } = await userService.login(username, password);
            res.json({ token, user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
