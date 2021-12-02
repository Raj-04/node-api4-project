const express = require('express')
const { userValidation, handleError } = require('./middleware')
const server = express()

server.use(express.json())

const users = [
  {
    username: 'sarah wachs',
    password: 'pass987',
    id: 0
  },
  {
    username: 'gayle tim',
    password: 'pass765',
    id: 1
  }
]

const add = (user) => {
  users.push(user)
  return user
}

const login = (credentials) => {
  return users.find(
    user => user.username === credentials.username &&
    user.password === credentials.password
  )
}

server.get('/', (req, res) => {
  res.json('Welcome! you should go to /api/users')
})

server.get('/api/users', (req, res) => {
  res.status(200).json(users)
})

server.post('/api/register', userValidation, (req, res, next) => {
  try {
    res.status(201).json(add(req.newUser))
  }
  catch (err) {
    next(err)
  }
})

server.post('/api/login', userValidation, (req, res, next) => {
  try {
    const checkCredentials = login(req.body)
    if(checkCredentials) {
      res.status(200).json({
        message: 'Welcome to Raj user database'
      })
    } else({
      status: 400,
      message: 'User not found, Please sign up with new credentials'
    })
  }
  catch (err) {
    next(err)
  }
})

server.use('*', (req, res, next) => {
  next({
    status: 404,
    message: `${req.method} ${req.originalUrl} not found!`
  })
})

server.use(handleError)

module.exports =server
