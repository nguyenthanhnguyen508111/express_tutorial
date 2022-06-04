const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/Express_Toturial_Dev',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log('connect mongoose error: '+ error);
    }
}

module.exports = { connect };