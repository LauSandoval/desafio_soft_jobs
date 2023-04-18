const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const {registrarusuarios, loginusuario, obtenerData} = require('./consultas')

app.use(cors());
app.use(express.json());

app.post("/usuarios",async (req, res) => {
    const {email, password, rol, lenguaje} = req.body
    await registrarusuarios(email, password, rol, lenguaje)
    res.send('Se creó usuario')
});

app.post("/login",async(req, res)=>{
    const {email,password} = req.body
    await loginusuario(email,password)
    const token = jwt.sign({email},"az_AZ")
    res.send(token)
})

app.get("/usuarios", async (req, res)=>{
    const authorization = req.header("Authorization");
    const token = authorization.split("Bearer ")[1];
    console.log(token)
    jwt.verify(token,"az_AZ")
    const {email} = jwt.decode(token)
    const datos = await obtenerData(email)
    res.json(datos)
})


app.listen(3000, () => {
    console.log('Server Up');
});