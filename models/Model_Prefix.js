const mongoose = require('mongoose');

const prefixModel = mongoose.Schema({
    GuildName: String,
    prefix: {
      CustomPrefix: String,
    },
    GuildID: Number
});

module.exports = mongoose.model('Prefix', prefixModel);