const express = require('express');
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roomController.create);
router.get('/', authMiddleware, roomController.findAll);
router.get('/:id', authMiddleware, roomController.findById);
router.put('/:id', authMiddleware, roomController.update);
router.delete('/:id', authMiddleware, roomController.delete); 
router.post('/join', authMiddleware, roomController.join);
router.post('/send-message', authMiddleware, roomController.sendMessage);

module.exports = router;
