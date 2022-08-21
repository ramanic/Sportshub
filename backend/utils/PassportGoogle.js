const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/common/User");
const { Profile } = require("../models/common/Profile");

const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await User.findOne({ email: profile.email });
        // if user exists return the user
        if (user) {
          const token = jwt.sign(
            { user_id: user._id, email: profile.email },
            process.env.TOKEN_KEY,
            {
              // expiresIn: '2h',
            }
          );
          user.token = token;
          user.new = false;
          return done(null, user);
        } else {
          newProfile = await Profile.create({
            photo: profile.picture,
          });
          user = await User.create({
            profile: newProfile,
            name: profile.displayName,
            email: profile.email,
            username: profile.given_name + profile.id,
          });

          const token = jwt.sign(
            { user_id: user._id, email: profile.email },
            process.env.TOKEN_KEY,
            {
              // expiresIn: '2h',
            }
          );
          user.new = true;
          user.token = token;
          console.log(user);
          console.log("Before----");
          done(null, user);
        }
      } catch (error) {
        console.log("Errror Login");
        console.log(error);
        return done(null, error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  if (user) return done(null, user);
  else return done(null, false);
}),
  passport.deserializeUser((id, done) => {
    if (user) return done(null, user);
    else return done(null, false);
  }),
  (module.exports = passport);
