const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Conectado!'))
.catch(error => console.log('Erro ao Conectar no MongoDB: ', error));

app.get('/', (req, res) => {
    res.send('Servidor rodando e conectado ao MongoDB')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://127.0.0.1:${PORT}`);
})

