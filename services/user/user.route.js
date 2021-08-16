const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');

const passport = require('passport');

/** Middleware */
const { checkEditProfileFields } = require('../../middleware/authenticate');

/**
 * @description  GET /api/user/users
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 * @access private
 */
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.getAll);

/**
 * @description PUT /api/user/current
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.put(
    '/current',
    [passport.authenticate('jwt', { session: false }), checkEditProfileFields],
    UserController.updateByCurrent
);

/**
 * @description GET api/user/current
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.get('/current', passport.authenticate('jwt', { session: false }), UserController.current);

/**
 * @description DELETE api/user/current
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.delete(
    '/current',
    passport.authenticate('jwt', { session: false }),
    UserController.deleteByCurrent
);

module.exports = router;
