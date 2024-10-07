const roomRepository = require('../repositories/roomRepository');

class RoomController {
    async create(req, res) {
        try {
            const roomData = req.body;
            const room = await roomRepository.create(roomData);
            res.status(201).json(room);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar a sala de reunião', error });
        }
    }

    async findAll(req, res) {
        try {
            const rooms = await roomRepository.findAll();
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar salas de reunião', error });
        }
    }

    async findById(req, res) {
        try {
            const room = await roomRepository.findById(req.params.id);
            if (!room) return res.status(404).json({ message: 'Sala de reunião não encontrada' });
            res.json(room);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar a sala de reunião', error });
        }
    }

    async update(req, res) {
        try {
            const updatedRoom = await roomRepository.update(req.params.id, req.body);
            if (!updatedRoom) return res.status(404).json({ message: 'Sala de reunião não encontrada' });
            res.json(updatedRoom);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar a sala de reunião', error });
        }
    }

    async delete(req, res) {
        try {
            const deletedRoom = await roomRepository.delete(req.params.id);
            if (!deletedRoom) return res.status(404).json({ message: 'Sala de reunião não encontrada' });
            res.json({ message: 'Sala de reunião deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar a sala de reunião', error });
        }
    }

    async join(req, res) {
        const { roomId } = req.body;
    
        console.log('Tentando entrar na sala:', roomId);
    
        try {
            const room = await roomRepository.findById(roomId);
            console.log('Sala encontrada:', room);
    
            if (!room) return res.status(404).json({ message: 'Sala de reunião não encontrada' });
    
            const updatedRoom = await roomRepository.addParticipant(roomId, req.userId);
            console.log('Usuário adicionado, sala atualizada:', updatedRoom);
    
            res.status(200).json({ message: `Usuário ${req.userId} entrou na sala ${roomId}`, room: updatedRoom });
        } catch (error) {
            console.error('Erro ao entrar na sala:', error);
            res.status(500).json({ message: 'Erro ao entrar na sala de reunião', error: error.message });
        }
    }

    async addParticipant(roomId, userId) {
        const room = await this.findById(roomId);
        if (!room) {
            throw new Error('Sala não encontrada');
        }
    
        if (!room.participants.includes(userId)) {
            room.participants.push(userId);
            await room.save();
        }
    
        return room;
    }

    async sendMessage(req, res) {
        const { roomId, content } = req.body;

        try {
            const room = await roomRepository.findById(roomId);
            if (!room) {
                return res.status(404).json({ message: 'Sala não encontrada' });
            }

            if (!room.participants.includes(req.userId)) {
                return res.status(403).json({ message: 'Você não tem permissão para enviar mensagens nesta sala.' });
            }

            const message = { userId: req.userId, content, timestamp: new Date() };
            room.messages.push(message);
            await room.save();

            res.status(201).json({ message: 'Mensagem enviada com sucesso', room });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao enviar mensagem', error });
        }
    }
    
}

module.exports = new RoomController();