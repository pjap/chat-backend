const { User } = require('../../models/User');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const _ = require('lodash');

/** Middleware */
const { createErrorObject } = require('../../middleware/authenticate');

module.exports = {
    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email }).select('-password');

        if (!user) {
            return res.status(404).send({
                error: 'No User Found'
            });
        }

        const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: 18000 });

        res.status(200).send({ auth: true, token: `Bearer ${token}`, user });
    },
    register: async (req, res) => {
        let errors = [];

        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                errors.push({ param: 'email', msg: 'Email is already taken' });

                if (user.username === req.body.username) {
                    errors.push({ param: 'username', msg: 'Username is already taken' });
                }

                res.send({
                    errors: createErrorObject(errors)
                }).end();
            } else {
                /** Assign Gravatar */
                const avatar = gravatar.url(req.body.email, {
                    s: '220',
                    r: 'pg',
                    d: 'identicon'
                });

                const newUser = new User({
                    handle: req.body.handle,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    image: avatar
                });

                newUser
                    .save()
                    .then(userData => {
                        const user = _.omit(userData.toObject(), ['password']);

                        const token = jwt.sign(user, process.env.JWT_SECRET, {
                            expiresIn: 18000
                        });

                        res.status(200).send({
                            auth: true,
                            token: `Bearer ${token}`,
                            user
                        });
                    })
                    .catch(err => {
                        res.send({
                            err,
                            error: 'Something went wrong, Please check the fields again'
                        });
                    });
            }
        });
    },
    logout: async (req, res) => {
        const user = await User.findOne({ username: req.body.username }).select('-password');

        if (!user) {
            return res.status(404).send({
                error: 'No User Found'
            });
        }

        res.status(200).send({ success: true });
    }
};
