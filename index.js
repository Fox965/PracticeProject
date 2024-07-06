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

//болванка для пользователей
let users = [
  {
    nick: "Alberto",  role: "admin", email: "mail4Me@mail.ru",
    avatar: "assets/mainAdmin/user.svg"
  },
  {
    nick: "Lucky38",  role: "user", email: "mail2You@mail.ru",
    avatar: "assets/mainAdmin/user.svg"},
]

function userRole(){    // Возвращает роль для проверки при переходе на админ страницы
  return users[0].role  // 0 - для админа, 1 - для обычного юзера
}

let nav = [
  {name: "Главная",  url: "/" },
  {name: "Контакты", url: "/contacts"},
  {name: "О сервисе", url: "/about" },
  {name: "Каталог", url: "/catalogue" },
  {name: "Сотрудничество", url: "/predlozhka" }
]

// болванка без бд для предложки админа
let predlozhka = []
for (let i = 0; i < 10; i++){
  predlozhka.push(
    {
      name: "Пупа и Лупа",
      email: "lupapupa@gmail.com", 
      author: "Пупа Л.У.", 
      genre: "Детектив", 
      pages: 312, 
      image: "assets/mainAdmin/PREDLOZHKAbook.jfif", 
      price: 799
    },
  )
};

// болванка для корзины
let korzina = []
for (let i = 0; i < 4; i++)
  korzina.push(
    {
      name: "Мистер Пупа", 
      image: "assets/korzina/book-basket-2.png", 
      price: 499,
      author: "Лупа П.А.",
      price: 430,
      pages: 200, 
      count: 1,
    },
  );

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
      user: `admin`,
      id: 0
    }
  })
})

app.get(`/catalogue`, (req, res) => {
  res.render(`catalogue`, {
    nav: nav,
    user: {
      user: `admin`,
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
      user: `admin`,
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
      user: `admin`,
      id: 0
    },
    book: catalogue[Number(bookId)]
  })
})

app.get(`/predlozhka`, (req, res) => {
  res.render(`predlozhka`, {
    nav: nav,
    user: {
      user: `admin`,
      id: 0
    },

  })
})

app.get(`/auth`, (req, res)=>{
  res.render(`auth`, {
    nav: nav,
    user: {
      user: `admin`,
      id: 0
    }
  });
})

app.get(`/account`, (req, res)=>{
  res.render(`account`, {
    nav: nav,
    user: users[0],
  })
})

app.get(`/korzina`, (req, res)=>{
  res.render(`korzina`, {
    nav: nav,
    user: {
      user: `admin`,
      id: 0
    },
    korzina: korzina,
  })
})

app.get(`/admin`, (req, res)=>{
  curUser = userRole();
  if(curUser == `admin`){
    res.render(`admin`, {
      user: users[0],
    })
  } 
  else{
    res.redirect(`/*`)
  } 
})

app.get(`/main`, (req, res)=>{
  curUser = userRole();
  if(curUser == `admin`){
    res.render(`main`, {
      user: users[0],
    })
  } 
  else{
    res.redirect(`/*`)
  } 
})

app.get(`/proposal`, (req, res)=>{
  curUser = userRole();      
  if(curUser == `admin`){
    res.render(`proposal`, {
      user: users[0],
      predlozhka: predlozhka,
    })
  } 
  else{
    res.redirect(`/*`)
  } 
})

//на любой несуществующий путь рендер 404 страницы
app.all('*', (req, res) => {
  res.status(404).render(`error_404`);
});