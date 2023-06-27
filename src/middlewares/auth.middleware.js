class AuthMiddleware {
    static IsLogin(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }
}

module.exports = AuthMiddleware;