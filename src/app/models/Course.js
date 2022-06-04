const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

//Tăng tự động
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: {type: Number},
        name: {type: 'string', default: '', require: true},
        description: {type: 'string', default:''},
        image: {type: 'string', default:''},
        videoId: {type: 'string', default:'',require: true},
        slug: {type: String, slug:'name', unique: true},//unique: true là tồn tại duy nhất
    },
    {
        _id: false,
        timestamp:true
    }
);

//Custome Query Helpers
CourseSchema.query.sortable = function(req){
    if(req.query.hasOwnProperty('_sort')){
        const isValueType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValueType ? req.query.type : 'asc'
        });
    }
    return this;
};

//Add Plugin
mongoose.plugin(slug);

//Tăng _id tự động
//npm install --save mongoose-sequence
CourseSchema.plugin(AutoIncrement);

CourseSchema.plugin(mongooseDelete,  { 
    overrideMethods: 'all', //Áp dụng cho tất cả
    deletedAt : true //Lưu thời điểm xóa
});

module.exports = mongoose.model('Courses', CourseSchema);