const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose');
class CourseController 
{
    //[GET]/courses/:slug
    detail(req, res, next) {
        //Promise
        Course.findOne({ slug: req.params.slug})
                .then(course => { 
                    res.render('courses/detail',{course: mongooseToObject(course)});
                })
                .catch(next);
    };
    //[GET]/courses/create
    create(req, res, next) {
        res.render('courses/create');
    };

    //[POST]/courses/store
    store(req, res, next) {
        const formData = {...req.body};
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save().then(()=> res.redirect('/me/stored/courses')).catch(next);
    };
    //[GET]/courses/edit/:id
    edit(req, res, next) {
       //Promise
       Course.findById(req.params.id)
       .then(course => { 
           res.render('courses/edit',{course: mongooseToObject(course)});
       })
       .catch(next);
    };
    //[PUT]/courses/:id
    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        Course.updateOne({_id: req.params.id}, formData)
                .then(() => res.redirect('/me/stored/courses'))
                .catch(next);
        
    };

    //[DELETE]/courses/:id
    delete(req, res, next) {
        //Sort delete - Xóa mềm - npm install mongoose-delete
        Course.delete({_id: req.params.id})
                .then(() => res.redirect('back'))
                .catch(next);
        
    };

    //[PATCH]/courses/restore/:id
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
                .then(() => res.redirect('back'))
                .catch(next);
        
    };
    //[DELETE]/courses/force/:id
    forceDelete(req, res, next) {
        //Sort delete - Xóa mềm - npm install mongoose-delete
        Course.deleteOne({_id: req.params.id})
                .then(() => res.redirect('back'))
                .catch(next);
        
    };

    //[POST]/courses/handle-form-actions
    handleFormActions(req, res, next) {
        console.log(req.body);
        switch (req.body.actionSelect) {
            case 'delete':
                Course.delete({_id: { $in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next);
                break;
            case 'restore':
                Course.restore({_id: { $in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next);
                break;
            case 'delete-force':
                Course.deleteMany({_id: { $in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next);
                break;
            default:
                res.redirect('back');
                break;
        }

    };

}
module.exports = new CourseController();