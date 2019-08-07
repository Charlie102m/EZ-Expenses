module.exports = {
    APP_SECRET() {
        if (process.env.NODE_ENV === 'production') {
            return false
        } else {
            return process.env.SECRET_KEY = 'This is the app secret used to set JWT tokens'
        }
    }
}