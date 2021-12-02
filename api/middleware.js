let initialId = 2

function userValidation (req, res, next) {
    const { username, password } = req.body
    if(username && username.trim() && password && password.trim()) {
        req.newUser = {...req.body, id: initialId++}
        next()
    } else {
        next({
            status: 400,
            message: 'please provide a valid Username and Password'
        })
    }
}

function handleError(err, req, res, next) {
    res.status(er.status || 500).json({
        message: err.message,
    })
}

module.exports = {
    userValidation,
    handleError,
}

