const express = require('express');
const router = express.Router();
const RoomController = require('./room.controller');

const passport = require('passport');

/** Middleware */
const { checkCreateRoomFields } = require('../../middleware/authenticate');

/**
 * @description GET /api/room
 */
router.get('/', passport.authenticate('jwt', { session: false }), RoomController.getAll);

/**
 * @description GET /api/room/:room_id
 */
router.get('/:room_id', passport.authenticate('jwt', { session: false }), RoomController.getById);

/**
 * @description POST /api/room
 */
router.post(
    '/',
    [passport.authenticate('jwt', { session: false }), checkCreateRoomFields],
    RoomController.createNew
);

/**
 * @description POST /api/room/verify
 */
router.post('/verify', passport.authenticate('jwt', { session: false }), RoomController.verify);

/**
 * @description DELETE /api/room/:room_name
 */
router.delete(
    '/:room_name',
    passport.authenticate('jwt', { session: false }),
    RoomController.deleteByName
);

/**
 * @description PUT /api/room/update/name
 */
router.post(
    '/update/name',
    passport.authenticate('jwt', { session: false }),
    RoomController.updateName
);

/**
 * @description PUT /api/room/remove/users
 */
router.post(
    '/remove/users',
    passport.authenticate('jwt', { session: false }),
    RoomController.removeUsers
);

/**
 * @description PUT /api/room/remove/users/:id/all
 */
router.put(
    '/remove/users/all',
    passport.authenticate('jwt', { session: false }),
    RoomController.removeAllUsers
);

module.exports = router;
