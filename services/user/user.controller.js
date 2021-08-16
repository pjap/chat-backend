const { User } = require('../../models/User');

module.exports = {
    getAll: async (req, res) => {
        const users = await User.find({}, 'image email username location').exec();

        if (users) {
            return res
                .status(200)
                .json(users)
                .end();
        } else {
            return res.status(404).json({ error: 'No Users Found' });
        }
    },
    current: async (req, res) => {
        res.json(req.user);
    },
    updateByCurrent: async (req, res) => {
        const updateFields = {};

        for (let key of Object.keys(req.body)) {
            if (req.body[key] !== null) {
                updateFields[key] = req.body[key];
            }
        }

        User.findOneAndUpdate({ _id: req.user.id }, { $set: updateFields }, { new: true })
            .select('-password')
            .then(doc => res.status(200).json({ success: true, user: doc }))
            .catch(err => res.status(404).json({ error: err }));
    },
    deleteByCurrent: async (req, res) => {
        console.log('MASUK SINI');
        /** Delete the user */
        await User.findOneAndDelete({ _id: req.user.id });

        res.json({ success: true });
    }
};
