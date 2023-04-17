const {Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'ivan2102',
    database: 'softjobs',
    allowExitOnIdle: true,

})

const registrarusuarios = async (email, password, rol, lenguaje) => {
    const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)"
    const values = [email, password,rol, lenguaje]
    await pool.query(consulta, values)

}

module.exports = {registrarusuarios}

