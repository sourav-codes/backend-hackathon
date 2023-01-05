const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    Tag: String,
});

module.exports = mongoose.model('Tag', TagSchema);