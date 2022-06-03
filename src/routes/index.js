const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app){

    app.get('/', siteRouter);
    
    app.use('/news', newsRouter);
    
    app.get('/search', siteRouter);
}
module.exports = route;