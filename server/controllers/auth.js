const { validationResult } = require('express-validator');
const User = require('../models/usuarios.modeles')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');