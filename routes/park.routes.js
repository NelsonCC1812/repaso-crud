const express = require('express')
const router = express.Router()

const Parks = require('../models/park.model')

// Aquí los endpoints

router.get('/new', (req, res) => {
    res.render('./parks/new-park')
        .catch(err => console.log("Ha habido un error: ", err))
})

router.post('/new', (req, res) => {
    const { name, description, active } = req.body

    if (!name || !description)
    {
        res.render("./parks/new-coaster", { message: "Introduce bien los cambios" })
        return
    }

    Parks.findOne({ name: name })
        .then(place => {
            if (place)
            {
                res.render('./parks/new-coaster', { message: "Ese parke ya existe en nuestra base de datos" })
                return
            }

            Parks.create({ name, description, active })
                .then(park => res.redirect("/parks"))
                .catch(err => console.log("Ha habido un error en la creacin del parke: ", err))
        })
        .catch(err => console.log("Ha habido un error en la comprobacion del parque: ", err))
})

module.exports = router