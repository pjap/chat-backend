const express = require('express');
const router = express.Router();
const ProfileController = require('./profile.controller');

const passport = require('passport');

/**
 * @description GET api/profile/:handle
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.get('/:handle', passport.authenticate('jwt', { session: false }), ProfileController.handle);

module.exports = router;
