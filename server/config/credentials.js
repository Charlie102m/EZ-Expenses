module.exports = {
    APP_SECRET() {
        return process.env.SECRET_KEY = 'This is the app secret used to set JWT tokens'
    }
}