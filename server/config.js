exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://testuser:abc123@ds163699.mlab.com:63699/social-app' :
                            'mongodb://localhost/social-app-dev');
exports.PORT = process.env.PORT || 8080;

exports.jwtSecret = 'verysecretkeyjwt';