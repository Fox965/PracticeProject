// npm init -y
// npm install express
// node index.js
// npm install hbs
// npm install nodemon
// "start": "nodemon index.js" (внутри package.json в строке scripts)
// npm install @faker-js/faker
// npm start

let express = require(`express`)
let app = express()

app.use(express.static(`public`))

const hbs = require('hbs')
app.set('views', 'views')
app.set('view engine', 'hbs')

let bodyParser = require(`body-parser`)
let urlencodedParser = bodyParser.urlencoded({ extended: false })

let port = 3000
app.listen(port, function(){
    console.log(`http://localhost:${port}/`)
})

app.get(`/`, function(req, res){    
  res.render(`index`)
})