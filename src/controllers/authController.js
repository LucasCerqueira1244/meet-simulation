const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Por favor, forneça todos os campos.' });
  }

  try {
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email já em uso.' });
    }

    const user = await userRepository.createUser({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, forneça todos os campos.' });
  }

  try {
    const user = await userRepository.findUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = { register, login };