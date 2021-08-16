const express = require('express');
const router = express.Router();
const MessageController = require('./message.controller');

const passport = require('passport');

/**
 * @description GET /api/messages/:room_id
 */
router.get('/:room_id', passport.authenticate('jwt', { session: false }), MessageController.getAll);

/**
 * @description POST /api/messages/
 */
router.post('/', passport.authenticate('jwt', { session: false }), MessageController.createNew);

module.exports = router;
