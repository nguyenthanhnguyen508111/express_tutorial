const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');//CHUYEN DOI PHUONG THUC CALL REST-API
const sortMiddleware = require('./app/middlewares/sortMiddleware')

const path = require('path');
const route = require('./routes');
const db = require('./config/db');

const app = express();
const port = 3000;

//COnnect DB MONGO
db.connect();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use(express.urlencoded({
  extended:true
}));

app.use(express.json());

//Thu mục public là gốc cho file tĩnh
app.use(express.static(path.join(__dirname,'public')));

//HTTP logger
app.use(morgan('combined'));

//Custome Middleware
app.use(sortMiddleware);

//Template engine
app.engine(
  'hbs', 
  engine({
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
  }
));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources','views'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});