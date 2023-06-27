const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user.model");


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err);
            });
    });

    // GOOGLE LOGIN
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL,
            },
            function (token, refreshToken, profile, done) {
                process.nextTick(() => {
                    User.findOne({ googleId: profile.id })
                        .then(user => {
                            if (user) {
                                return done(null, user);
                            }

                            let newUser = new User();
                            newUser.googleId = profile.id;
                            newUser.googleToken = token;
                            newUser.fullName = profile.displayName;
                            newUser.email = profile.emails[0].value; // pull the first email
                            newUser.save()
                                .catch(err => {
                                    return done(err);
                                });
                        })
                        .catch(err => {
                            return done(err);
                        });
                })
            }
        )
    );
}