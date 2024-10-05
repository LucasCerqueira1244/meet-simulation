const express = require('express');
const connectDB = require('../src/config/mongo');
const dotenv = require('dotenv');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor rodando e conectado ao MongoDB!')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://127.0.0.1:${PORT}`);
});
