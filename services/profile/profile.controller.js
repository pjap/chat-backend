const { User } = require('../../models/User');

module.exports = {
    handle: async (req, res) => {
        const user = await User.findOne({ handle: req.params.handle })
            .select('-password -session_id')
            .exec();

        if (user) {
            return res
                .status(200)
                .json(user)
                .end();
        } else {
            return res
                .status(404)
                .json({ error: `No user found called ${req.params.handle}` })
                .end();
        }
    }
};
