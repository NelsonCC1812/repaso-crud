const express = require('express')
const router = express.Router()

const Parks = require('../models/park.model')
const Coasters = require("../models/coaster.model")

// Aquí los endpoints

router.get('/', (req, res) => {
    Coasters.find()
        .then(coasters => res.render('coasters/coasters-index', { coasters }))
        .catch(err => console.log("ha habido un error, ", err))
})

router.get('/new', (req, res) => {

    Parks.find()
        .then(parks => res.render('./coasters/new-coaster', { parks }))
        .catch(err => console.log('Ha habido un erros: ', err))
})

router.post('/new', (req, res) => {

    const { name, description, inversions, length, park } = req.body

    if (!name || !description || !inversions || !length || !park)
    {
        res.render("./coasters/new-coaster", { message: "Introduzca bien los datos" })
        return
    }

    Coasters.findOne({ name: name })
        .then(existingPark => {
            if (existingPark)
            {
                res.render("./coasters/new-coaster", { message: "That coaster is already in our database" })
                return
            }

            Coasters.create({ name, description, inversions, length, park })
                .then(park => res.redirect("/coasters"))
                .catch(err => console.log("Ha habido un error en la creacion del coaster", err))
        })
        .catch(err => console.log("Ha habido un error en la comprobacion del coaster", err))
})

router.get('/delete', (req, res) => {
    Coasters.findByIdAndDelete(req.query.id)
        .then(x => res.redirect('/coasters'))
        .catch(err => console.log("ha habido un error", err))
})

router.get('/edit', (req, res) => {
    const data = { coaster: undefined, parks: undefined }
    Coasters.findById(req.query.id)
        .populate("park")
        .then(coaster => { data.coaster = coaster })
        .then(x => Parks.find())
        .then(parks => {
            let arr = [...parks]
            data.parks = arr.filter(elm => elm.name != data.coaster.park.name)
        })
        .then(x => res.render("./coasters/edit", data))
        .catch(err => console.log("Ha habido un error", err))
})

router.post('/edit', (req, res) => {
    const { name, description, inversions, length, park } = req.body

    if (!name || !description || !inversions || !length || !park)
    {
        res.render("./coasters/new", { mesage: "Introduzca bien los datos" })
        return
    }

    Coasters.findByIdAndUpdate({ _id: req.query.id }, { name, description, inversions, length, park })
        .then(park => res.redirect(`/coasters/${req.query.id}`))
        .catch(err => console.log("Ha habido un error en la creacion del coaster", err))
})

router.get('/:id', (req, res) => {
    Coasters.findById(req.params.id)
        .populate("park")
        .then(coaster => res.render("./coasters/coaster-details", coaster))
        .catch(err => console.log("ha habido un error", err))
})


module.exports = router