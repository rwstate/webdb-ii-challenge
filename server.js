const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/cars', (req,res) => {
  db('cars')
    .then(cars => res.status(200).json(cars))
    .catch(err => res.status(500).json({errMsg: 'error fetching cars'}))
})

server.post('/api/cars', validateCar, (req,res) => {
  db('cars').insert(req.body)
    .then(cars => res.status(200).json(cars))
    .catch(err => res.status(500).json({errMsg: 'error adding car'}))
})

function validateCar(req, res, next) {
  const errors = []

  if (!Object.keys(req.body).length) {
    res.status(400).json({errMsg: 'missing car info'})
  }

  if (!req.body.VIN) {
    errors.push('VIN is required')
  }

  if (!Number.isInteger(req.body.VIN)) {
    errors.push('VIN must be an integer')
  }

  if (!req.body.make) {
    errors.push('make is required')
  }

  if (typeof req.body.make != 'string') {
    errors.push('make must be a string')
  }

  if (!req.body.model) {
    errors.push('model is required')
  }

  if (typeof req.body.model != 'string') {
    errors.push('model must be a string')
  }

  if (!req.body.mileage) {
    errors.push('mileage is required')
  }

  if (!Number.isInteger(req.body.mileage)) {
    errors.push('mileage must be an integer')
  }

  if (errors.length) {
    res.status(400).send(errors.join(', '))
  }

  next()
}

module.exports = server;