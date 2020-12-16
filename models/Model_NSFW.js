const mongoose = require('mongoose');

const nsfwModel = mongoose.Schema({
    GuildName: String,
    allowNSFW: Boolean,
    GuildID: Number,
});
module.exports = mongoose.model('NSFW', nsfwModel);