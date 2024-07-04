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

app.use(express.static(`public`));

app.set('views', 'views')
app.set('view engine', 'hbs')

let bodyParser = require(`body-parser`)
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

let port = 3001;
app.listen(port, function(){
  console.log(`http://localhost:${port}/`)
})

let nav = [
  {name: "Главная",  url: "/" },
  {name: "Контакты", url: "/contacts"},
  {name: "О сервисе", url: "/about" },
  {name: "Каталог", url: "/catalogue" },
  {name: "Сотрудничество", url: "/predlozhka" }
]

// ВРЕМЕННОЕ ЗАПОЛНЕНИЕ КАТАЛОГА, ЗАМЕНЯЕТСЯ МАССИВОМ ИЗ БАЗЫ ДАННЫХ
const catalogue = []
for (let i = 0; i < 16; i++)
  catalogue.push(
      {
        name: "Книжка",
        image: "/assets/book/imageBook.png",
        author: "автор",
        genre: "жанр",
        price: 9999,
        pages: 200
      }
  );

app.get(`/`, (req, res) => {
  res.render(`index`, {
    nav: nav,
    user: {
      user: `random`,
      id: 0
    }
  })
})

app.get(`/catalogue`, (req, res) => {
  res.render(`catalogue`, {
    nav: nav,
    user: {
      user: `random`,
      id: 0
    },
    catalogue: catalogue
  })
})

//ОБРАБОТКА АСИНХРОННОГО ЗАПРОСА ЖАНРА
app.post('/select-genre', (req, res) => {
  const genre = req.body.genre;
  console.log('Selected genre:', genre);
  res.json({ success: true, message: `Selected genre: ${genre}` });
});

//ОБРАБОТКА АСИНХРОННОГО ЗАПРОСА ПОИСКА
app.post('/search', (req, res) => {
  const requestSearch = req.body.valueForm;
  console.log('Результат поиска:', requestSearch);
  res.json({ success: true, message: `Результат поиска: ${requestSearch}` });
});

app.get(`/contacts`, (req, res) => {
  res.render(`contacts`, {
    nav: nav,
    user: {
      user: `random`,
      id: 0
    },
    cards: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  })
})

app.get(`/book`, (req, res) => {
  let bookId = req.query.id
  res.render(`book`, {
    nav: nav,
    user: {
      user: `random`,
      id: 0
    },
    book: catalogue[Number(bookId)]
  })
})

app.get(`/predlozhka`, (req, res) => {
  res.render(`predlozhka`, {
    nav: nav,
    user: {
      user: `random`,
      id: 0
    },

  })
})

app.get(`/auth`, (req, res)=>{
  res.render(`auth`, {
    nav: nav,
    user: {
      user: `random`,
      id: 0
    }
  });
})
app.get(`/account`, (req, res)=>{
  res.render(`account`, {
    nav: nav,
    user: {
      user: `random`,
      id: 0
    }
  })
})

app.get(`/korzina`, (req, res)=>{
  res.render(`korzina`, {
    nav: nav,
    user: {
      user: `random`,
      id: 0
    }
  })
})

//на любой несуществующий путь рендер 404 страницы
app.all('*', (req, res) => {
  res.status(404).render(`error_404`);
});