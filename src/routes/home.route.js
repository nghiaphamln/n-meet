const express = require('express');
const router = express.Router();
const passport = require('passport');
const HomeController = require('../controllers/home.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router
    .get(
        '/',
        AuthMiddleware.IsLogin,
        HomeController.Index
    )

    .get(
        '/login',
        HomeController.Login
    )

    .get(
        '/auth/google',
        passport.authenticate('google', {
            scope: [
                'profile',
                'email'
            ]
        })
    )

    .get(
        '/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/'
        })
    )


module.exports = router;