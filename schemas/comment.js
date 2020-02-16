const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Type:ObjectId } = Schema; // object for {_id, name, age, ...}
const commentSchema = new Schema({
    writer: {
        type: ObjectId, 
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose,model('Comment', commentSchema);