const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema

const coasterSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    inversions: Number,
    length: Number,
    active: {
        type: Boolean,
        default: true
    },
    park: { type: Schema.Types.ObjectId, ref: 'Park' }
})

module.exports = mongoose.model('Coaster', coasterSchema)