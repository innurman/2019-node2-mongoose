const mongoose = require('mongoose');
module.exports = () => {
    // https://www.npmjs.com/package/mongoose
    // await mongoose.connect('mongodb://localhost/my_database', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // });
    const connect = () => {
        mongoose.connect('mongodb://localhost:15000/node', {

        }, (err) => {
            if(err) console.log(err);
            else console.log("몽고디비 연결");
        });
    }
    connect();
    mongoose.connections.concat('error', (err) => {
        console.log(err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('몽고디비 다시 연결');
        connect();
    });

    require('./user');    // user.js -> userSchemar
    require('./comment'); // comment.js -> commentSchema
}