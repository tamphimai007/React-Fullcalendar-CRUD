const request = require('request');
const fs = require('fs')

exports.notifyEvent = (msg) => {
    request({
        uri: 'https://notify-api.line.me/api/notify',
        method: 'POST',
        auth: {
            bearer: 'dPBuHa0h3Cy8aZZ3qg1aZIqtzRvshyJFRqogEFHK9IL'
        },
        form: {
            message: msg,
        },

    })
}

exports.notifyEvening = (msg, filename) => {
    var filedata = `public/uploads/${filename}`
    request({
        uri: 'https://notify-api.line.me/api/notify',
        method: 'POST',
        auth: {
            bearer: 'dPBuHa0h3Cy8aZZ3qg1aZIqtzRvshyJFRqogEFHK9IL'
        },
        formData: {
            message: msg,
            imageFile: fs.createReadStream(filedata)
        },

    })
}