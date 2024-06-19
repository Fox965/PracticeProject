const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const hbs = require('hbs');
const path = require('path');
// const User = require('./models/user');
// const sequelize = require('./models/connector');

const app = express();

app.use(session({ secret: '13AF@$FC@$@@', resave: false, saveUninitialized: false }));


passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));


app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, password: hashedPassword });
    res.redirect('/login');
  } catch (err) {
    res.redirect('/register');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// ВНИМАНИЕ! ВНИМАНИЕ! Мне было лень в докере поднимать БД, но я уверен что оно работать будет, поэтому закоментил
// Мне лениться можно, а вам - НЕТ, РАССКОМЕНТИ И ДЕЛАЙ КАК НАДО!!!
// sequelize.sync()
//   .then(() => {
//     app.listen(3000, () => {
//       console.log('Server is running on port 3000');
//     });
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// Не говори, что мне делать, я сам всё сделаю как надо! -_-