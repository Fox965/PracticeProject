// npm init -y
// npm install express
// node index.js
// npm install hbs
// npm install nodemon
// "start": "nodemon index.js" (внутри package.json в строке scripts)
// npm install @faker-js/faker
// npm start

require('./hbsRegister/hbsRegister');
const connection = require('./models/connector');
const middleware = require('./middleware/middleware')

let mysql = require(`mysql2`)
let query = ''

let express = require(`express`)
let app = express()

app.use(express.static(`public`));

app.set('views', 'views')
app.set('view engine', 'hbs')

const bcrypt = require('bcryptjs');

let { faker } = require(`@faker-js/faker`)
let session = require(`express-session`)
let bodyParser = require(`body-parser`)
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: false
}))
app.use(middleware)

let isAuth = 'false'

let port = 3001;
app.listen(port, function(){
  console.log(`http://localhost:${port}/`)
})

let users = []
connection.query('SELECT * FROM account', (err, result) =>{
    users = result
})

let user = []

let nav = [
  {name: "Главная",  url: "/" },
  {name: "Контакты", url: "/contacts"},
  {name: "О сервисе", url: "/about" },
  {name: "Каталог", url: "/catalogue" },
  {name: "Сотрудничество", url: "/predlozhka" }
]


let predl = {}
let predlozhka = []
connection.query('SELECT * FROM predlozhka', (err, result) =>{
  predlozhka = result
})


let korzina = []
connection.query('SELECT * FROM korzina', (err, result) =>{
  korzina = result
})

let genres = []
connection.query('SELECT * FROM genres', (err, result) =>{
  genres = result
})

let catalogue = []
connection.query('SELECT * FROM books', (err, result) =>{
  catalogue = result
})

app.get(`/`, (req, res) => {
  res.render(`index`, {
    nav: nav,
    user: user
  })
})

app.get(`/catalogue`, (req, res) => {
  connection.query('SELECT * FROM books', (err, result) =>{
    catalogue = result
  })
  res.render(`catalogue`, {
    nav: nav,
    user: user,
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

  connection.query('SELECT * FROM books WHERE book_name LIKE ?', [`%${requestSearch}%`], (err, result) =>{
    if(err) {
      console.log(err)
    } else {
      console.log(result)
      res.json({ success: true, data: result });
    }
  })
});

app.get(`/contacts`, (req, res) => {
  res.render(`contacts`, {
    nav: nav,
    user: user,
    cards: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  })
})

let book = ''
app.get(`/book`, (req, res) => {
  let bookId = req.query.id
  connection.query('SELECT * FROM books WHERE book_id = ?', [bookId], (err, result) =>{
    book = result
    console.log(book[0])
  })
  res.render(`book`, {
    nav: nav,
    user: user,
    book: book[0]
  })
})

app.get(`/dob`, (req, res) => {
  console.log(user)
  if(user == '') {
    res.redirect(`/auth`)
  } else {
    let id = req.query.id
    connection.query('INSERT INTO korzina (`acc_id`, `book_id`) VALUES (?, ?)', [user.acc_id, id], (err, result) =>{
    if(err) {
      console.log(err)
    } else {   
      console.log(`Добавление книги ${id} в корзину успешно!`)
    }

    connection.query('SELECT * FROM korzina', (err, result) =>{
      korzina = result
    })
  res.redirect(`/book?id=${id}`)
})}})

app.get(`/predlozhka`, (req, res) => {
  res.render(`predlozhka`, {
    nav: nav,
    user: user

  })
})

app.post(`/predlozhka`, urlencodedParser, (req, res) => {
  predl = {
    name: req.body.name,
    image: "/assets/book/imageBook.png",
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
    pages: req.body.pages,
    email: req.body.email,
  }

  connection.query('INSERT INTO predlozhka (`pred_email`, `pred_name`, `pred_author`, `genre_name`, `pred_pages`, `pred_image`, `pred_price`) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.email, req.body.name, req.body.author, req.body.genre, req.body.pages, "/assets/book/imageBook.png", req.body.price], (err, result) =>{
    if(err) {
      console.log(err)
    } else {
      predlozhka = result
      console.log(`Добавление предложения книги ${req.body.name} прошло успешно!`)
    }
})
  res.render(`predlozhka`, {
    nav: nav,
    user: user
  })
})

app.get(`/auth`, (req, res)=>{
  res.render(`auth`, {
    nav: nav,
    user: user
  });
})

app.post(`/regSystem`, urlencodedParser, (req, res) => {
  if(!users.find(user => user.acc_login === req.body.login || user.acc_email === req.body.email)) {
    if(req.body.password === req.body.rpassword) {
      connection.query('INSERT INTO account (`acc_login`, `acc_password`, `acc_role`, `acc_avatar`, `acc_email`, `acc_name`) VALUES (?, ?, ?, ?, ?, ?);', [req.body.login, req.body.password, 'user', 'assets/mainAdmin/user.svg', req.body.email, req.body.name], (err, result) =>{
        if(err) {
          console.log(err)
        } else {
          console.log(`Регистрация пользователя ${req.body.name} прошла успешно!`)
        }
      })
      connection.query('SELECT * FROM account', (err, result) =>{
        users = result
      })
      res.redirect(`/auth`);
    } else {
      res.render(`auth`, {
        nav: nav,
        user: user,
        error: 'Пароли разные.'
      });
    }
  } else {
    res.render(`auth`, {
      nav: nav,
      user: user,
      error: 'Пользователь с таким логином или почтой уже существует.'
    });
  }
});

app.post(`/enterSystem`, urlencodedParser, (req, res) => {
  user = users.find(user => user.acc_login === req.body.login && user.acc_password === req.body.password);
  if (!user) {
    res.render(`auth`, {
      nav: nav,
      user: user,
      error: 'Неправильный логин или пароль.'
    });
  } else {
    req.session.isAuthenticated = true;
    isAuth = true
    console.log(user)
    console.log(`Пользователь ${user.acc_name} успешно вошёл!`)
    res.redirect(`/account`)
  }
})

app.get(`/logout`, (req, res)=>{
  req.session.isAuthenticated = false
  isAuth = false
  console.log(isAuth)
  user = []
  res.redirect('/auth')
})

let korzina_result = ``
app.get(`/account`, (req, res)=>{
  if(user == '') {
    res.redirect(`/auth`)
  } else {
    connection.query('SELECT books.book_id, book_name, book_author, book_pages, book_price, book_image, acc_id FROM books INNER JOIN korzina ON books.book_id = korzina.book_id WHERE acc_id = ?', [user.acc_id], (err, result) =>{
      korzina_result = result
      console.log(korzina_result)
    })
    res.render(`account`, {
      nav: nav,
      user: user,
      korzina: korzina_result,
    })
  }
  
})

app.get(`/korzina`, (req, res)=>{
  if(user == '') {
    res.redirect(`/auth`)
  } else {
    connection.query('SELECT books.book_id, book_name, book_author, book_pages, book_price, book_image, acc_id FROM books INNER JOIN korzina ON books.book_id = korzina.book_id WHERE acc_id = ?', [user.acc_id], (err, result) =>{
      korzina_result = result
      console.log(korzina_result)
    })
    
    res.render(`korzina`, {
      nav: nav,
      user: user,
      korzina: korzina_result,
    })
  }
})

app.get(`/admin`, (req, res)=>{
  if(user.acc_role == 'admin'){
    res.render(`admin`, {
      user: user,
    })
  } 
  else{
    res.redirect(`/*`)
  } 
})

app.get(`/main`, (req, res)=>{
  if(user.acc_role == `admin`){
    res.render(`main`, {
      user: user,
    })
  } 
  else{
    res.redirect(`/*`)
  } 
})

app.get(`/proposal`, (req, res)=>{
  if(user.acc_role == `admin`){
    connection.query('SELECT * FROM predlozhka', (err, result) =>{
      predlozhka = result
    })
    res.render(`proposal`, {
      user: user,
      predlozhka: predlozhka,
    })
  } 
  else{
    res.redirect(`/*`)
  } 
})

///////////////////////////////////////////////////////////////////////////////////////////////
app.post('/submit-data/:endpoint', urlencodedParser, (req, res) => {
  let endpoint = req.params.endpoint;
  let data = req.body.data;
  if (endpoint == 'first') {
    // Логика обработки для первого POST-запроса
    let query = 'INSERT INTO books (`book_name`, `book_author`, `book_genre`, `book_pages`, `book_price`, `book_image`) VALUES (?, ?, ?, ?, ?, ?)';
    let values = [data.name, data.author, data.genre, data.pages, data.price, data.image];
    connection.query(query, values, (err, result) =>{
      if(err) {
        console.log(err);
      }
    });

    query = 'SELECT * FROM books WHERE book_name = ? AND book_author = ? AND book_genre = ? AND book_pages = ? AND book_price = ? AND book_image = ?';
    values = [data.name, data.author, data.genre, data.pages, data.price, data.image];
    connection.query(query, values, (err, result) =>{
      if(err) {
        console.log(err);
      } else {
        catalogue.push(result)
        console.log(`Добавление книги ${data.name} в каталог прошло успешно!`);
      }
    });

    query = 'DELETE FROM predlozhka WHERE pred_id = ?';
    values = [data.id];
    connection.query(query, values, (err, result) =>{
        if (err) {
          console.log(err);
        } else {
          console.log(`Удаление книги ${data.name} из предложки прошло успешно!`);
        }                       
    })
    connection.query('SELECT * FROM predlozhka', (err, result) =>{
      predlozhka = result
    })

// Логика обработки для второго POST-запроса
  } else if (endpoint == 'second') {
    connection.query('DELETE FROM predlozhka WHERE pred_id = ?', [data.id], (err, result) =>{
        if (err) {
          console.log(err);
        } else {

          console.log(`Удаление книги ${data.name} из предложки прошло успешно!`);
        }
    })
    connection.query('SELECT * FROM predlozhka', (err, result) =>{
      predlozhka = result
    })
  }
});

//на любой несуществующий путь рендер 404 страницы
app.all('*', (req, res) => {
  res.status(404).render(`error_404`);
});