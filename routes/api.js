const express = require('express');
const router = express.Router();

/** Routes */
const authRoutes = require('../services/auth/auth.route');
const userRoutes = require('../services/user/user.route');
const profileRoutes = require('../services/profile/profile.route');
const roomRoutes = require('../services/room/room.route');
const messageRoutes = require('../services/message/message.route');

/** Routes Definitions */
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/room', roomRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
