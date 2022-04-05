
const bcryptjs = require('bcryptjs');


exports.isAdmin = async (req, res, next) => {
    const rolekey = req.rolekey
    try {
        if (await bcryptjs.compare('admin', rolekey.substr(7))) {

            res.status(200).send('Autorized')
        }
        else {
            res.status(401).json({ error: 'Unauthorized' })
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}

exports.isAuthorizedAdmin = async (req, res, next) => {

    const rolekey = req.rolekey
    try {
        if (await bcryptjs.compare('admin', rolekey.substr(7))) {
            return next()
        }
        else {
            res.status(401).json({ error: 'Unauthorized' })
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}

