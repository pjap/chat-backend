const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');

/** Middleware */
const { checkRegistrationFields, checkLoginFields } = require('../../middleware/authenticate');

/**
 * @description  POST /register
 * @param  {} [checkRegistrationFields]
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/register', [checkRegistrationFields], AuthController.register);

/**
 * @description POST /login
 * @param  {} checkLoginFields
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/login', checkLoginFields, AuthController.login);

/**
 * @description POST /logout
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/logout', AuthController.logout);

module.exports = router;
