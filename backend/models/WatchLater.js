const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WatchLaterSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    
    imdbId: {
        type: String,
        required: true,
        unique: true,
    },

    poster: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('watchLater', WatchLaterSchema);