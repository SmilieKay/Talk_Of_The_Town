const express = require('express');
const session = require('express-session');
const moment = require('moment');
const path = require('path');
const exphbs  = require('express-handlebars');
require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import your individual controllers
const blogRoutes = require('./controllers/blogController');
const userRoutes = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    formatDate: function (date, format) {
      return moment(date).format(format);
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use the routes from your imported controllers
app.use('/blog', blogRoutes); 
app.use('/users', userRoutes); 

// Homepage route
app.get('/', async (req, res) => {
  console.log("hello")
  try {
    // Fetch blog posts from the database
    const blogPosts = await sequelize.models.Blog.findAll(); // fetches blogs using sequelize models

    // Render the homepage view with the blog posts
    res.render('homepage', { blogs: blogPosts });
    // res.json(blogPosts);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  // Check if the user is logged in
  if (req.session.logged_in) {
    // Render the dashboard view
    res.render('dashboard');
  } else {
    // Redirect to the login page if not logged in
    res.redirect('/login');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy(() => {
    // Redirect to the homepage after logout
    res.redirect('/');
  });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
