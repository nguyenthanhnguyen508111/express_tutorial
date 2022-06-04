const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');
class SiteController 
{
    //[GET]/home
    index(req, res, next) {
        //res.render('home');

        //Method Callback
        // Course.find({}, function(err, course) {
        //     if(!err) {
        //         res.json(course);
        //     }
        //     else {
        //         next(err);
        //     }
        // });

        //Promise
        Course.find({})
                .then(courses => {
                    res.render('home', {courses: mutipleMongooseToObject(courses)});
                })
                .catch(next);
    }

    //[GET]/search
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController;