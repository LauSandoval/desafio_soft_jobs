const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const {registrarusuarios} = require('./consultas')

app.use(cors());
app.use(express.json());

app.post("/usuarios",async (req, res) => {
    const {email, password, rol, lenguaje} = req.body
    await registrarusuarios(email, password, rol, lenguaje)
    res.send('Se creó usuario')
}); 


app.listen(3000, () => {
    console.log('Server Up');
});