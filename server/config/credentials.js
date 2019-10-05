module.exports = {
    APP_SECRET() {
        if (process.env.NODE_ENV === 'production') {
            return false
        } else {
            process.env.AWS_SECRET_ACCESS_KEY = 'HyT0ScCq+fJ5Ct1WH/zF6gkZFEraOOr5dBMqFOYy'
            process.env.AWS_ACCESS_KEY_ID = 'AKIAIB425XP5CWIXX4CA'
            process.env.SECRET_KEY = 'This is the app secret used to set JWT tokens'
            return;
        }
    }
}