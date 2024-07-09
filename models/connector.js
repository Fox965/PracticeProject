let mysql = require(`mysql`)

const conn = mysql.createConnection({
  host: `localhost`,
  user: 'root',
  database: `bookknight`,
  password: '',
  connectTimeout: 200000
})

module.exports = conn

conn.connect( err => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log(`Successfuly connected!`)
  }
})

