// npm init -y
// npm install express
// node index.js
// npm install hbs
// npm install nodemon
// "start": "nodemon index.js" (внутри package.json в строке scripts)
// npm install @faker-js/faker
// npm start

require('./hbsRegister/hbsRegister');

let express = require(`express`)
let app = express()

app.use(express.static(`public`))

app.set('views', 'views')
app.set('view engine', 'hbs')

let bodyParser = require(`body-parser`)
let urlencodedParser = bodyParser.urlencoded({ extended: false })

let port = 3001
app.listen(port, function(){
  console.log(`http://localhost:${port}/`)
})

app.get(`/`, function(req, res){
  res.render(`index`, {
    nav: [
      {
        name: "Главная",
        url: "#"
      },
      {
        name: "Контакты",
        url: "#"
      },
      {
        name: "О сервисе",
        url: "#"
      },
      {
        name: "Каталог",
        url: "#"
      }
    ],
    user: {
      user: null,
      id: 0
    }
  })
})