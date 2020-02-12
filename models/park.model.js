const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema
const parkSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Park', parkSchema)