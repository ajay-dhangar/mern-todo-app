const UserRoutes = require('express').Router();

const {SignUp,Login}  = require('../models/userModel')


UserRoutes.post('/register',SignUp)
UserRoutes.post('/login',Login)


module.exports = UserRoutes