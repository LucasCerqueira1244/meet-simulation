const User = require('../models/User');

class UserRepository {
    
    async createUser(userData) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(userData.password, salt);
          
          const user = new User({
            ...userData,
            password: hashedPassword,
          });
          await user.save();
          return user;
        } catch (error) {
          throw new Error('Erro ao criar usuário: ' + error.message);
        }
      }

    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            throw new Error('Erro ao encontrar usuário: ' + error.message);
        }
    };

    async findUserById(id) {
        try {
        const user = await User.findById(id);
        return user;
        } catch (error) {
        throw new Error('Erro ao encontrar usuário: ' + error.message);
        }
    };

    async updateUser(id, updateData) {
        try {
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        return user;
        } catch (error) {
        throw new Error('Erro ao atualizar usuário: ' + error.message);
        }
    };

    async deleteUser(id) {
        try {
        await User.findByIdAndDelete(id);
        return { message: 'Usuário excluído com sucesso' };
        } catch (error) {
        throw new Error('Erro ao excluir usuário: ' + error.message);
        }
    };
};

module.exports = new UserRepository();