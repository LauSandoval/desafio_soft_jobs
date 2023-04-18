const {Pool} = require('pg')
const bcrypt = require('bcryptjs');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'ivan2102',
    database: 'softjobs',
    allowExitOnIdle: true,

})

const registrarusuarios = async (email, password, rol, lenguaje) => {
    const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)"
    const passwordEncrypted = bcrypt.hashSync(password)
    const values = [email, passwordEncrypted,rol, lenguaje]
    await pool.query(consulta, values)

}

const loginusuario = async (email, password)=>{
    const consulta = "SELECT * FROM usuarios values WHERE email = $1"
    const values = [email]
    const {rows:[usuario], rowsCount}= await pool.query(consulta,values)
    const {password:passwordEncrypted} = usuario
    const passwordCorrecta = bcrypt.compareSync(password,passwordEncrypted)
    
    if (!passwordCorrecta) {
        throw {code:401,message:"email is not a valid"}
    }
}


const obtenerData = async(email)=>{

    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]
    const {rows:[usuario],rowsCount} = await pool.query(consulta,values)
    // if (!rowsCount) {
    //     throw {code:401,message:"email is not a valid"}
    // }
    delete usuario.password
    return usuario

}

module.exports = {registrarusuarios, loginusuario, obtenerData}

