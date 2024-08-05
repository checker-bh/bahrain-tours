const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    res.render('trips/index.ejs', {
      trips: currentUser.trips,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/new', async (req, res) => {
  res.render('trips/new.ejs')
})

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    req.body.date = new Date(req.body.date)
    currentUser.trips.push(req.body)
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/trips`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:tripId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const trip = currentUser.trips.id(req.params.tripId)
    res.render('trips/show.ejs', {
      trip,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:tripId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.trips.id(req.params.tripId).deleteOne()
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/trips`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:tripId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const trip = currentUser.trips.id(req.params.tripId)
    res.render('trips/edit.ejs', {
      trip,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router