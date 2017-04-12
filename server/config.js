exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            process.env.DATABASE_URL :
                            'mongodb://localhost/social-app-dev');
exports.PORT = process.env.PORT || 8080;

exports.jwtSecret = process.env.jwtSecret;