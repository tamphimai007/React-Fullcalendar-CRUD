const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title: {
        type: String
    },
    filename: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    color: {
        type: String
    },
    allDay: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = Events = mongoose.model('events', eventSchema)