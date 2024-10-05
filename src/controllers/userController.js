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

const getUserProfile = async (req, res) => {
  try {
    const user = await userRepository.findUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const updatedUser = await userRepository.updateUser(req.userId, { name, email });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json({ message: 'Perfil atualizado com sucesso.', user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const result = await userRepository.deleteUser(req.userId);
    res.json(result);
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = { register, login, getUserProfile, updateUserProfile, deleteUserProfile };
