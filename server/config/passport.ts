import passport from "passport";
import LocalStrategyClass from "passport-local";
import {
  findUserByEmail,
  findUserById,
  findUserOrCreateService,
} from "../services/accounts.services";
import { comparePassword } from "../lib/auth.libs";
import GoogleStrategyClass from "passport-google-oauth20";
import FacebookStrategyClass from "passport-facebook";

const LocalStrategy = LocalStrategyClass.Strategy;
const GoogleStrategy = GoogleStrategyClass.Strategy;
const FacebookStrategy = FacebookStrategyClass.Strategy;

const localStrategyHandler = new LocalStrategy((username, password, cb) => {
  process.nextTick(async () => {
    try {
      const user = await findUserByEmail(username);
      if (!user) return cb(null, false);
      const isValid = comparePassword({
        hash: user.password,
        password,
      });
      if (!isValid) return cb(null, false);
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  });
});

const googleStrategyHandler = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_SECRET ?? "",
    callbackURL: `${process.env.HOST}/api/auth/callback/google/`,
  },
  async (acessToken, refreshToken, profile, cb) => {
    try {
      let email;
      if (profile.emails && profile.emails[0]) email = profile.emails[0].value;
      const id = profile.id;
      const username = profile.name.givenName;
      console.log("user", email, username, id);
      if (!email || !username || !id)
        return cb("google didn't provide a valid profile");
      const user = await findUserOrCreateService({
        username,
        id,
        email,
        password: "",
      });
      return cb(null, user);
    } catch (err) {
      return cb("error during google accounts authentication");
    }
  }
);

const facebookStragetyHandler = new FacebookStrategy(
  {
    callbackURL: `${process.env.HOST}/api/auth/callback/facebook/`,
    clientID: process.env.FACEBOOK_CLIENT_ID ?? "",
    clientSecret: process.env.FACEBOOK_SECRET ?? "",
    profileFields: ["id", "displayName", "email"],
  },
  async (accessToken, refreshToken, profile, cb) => {
    let email;
    if (profile.emails && profile.emails?.length > 0)
      email = profile.emails[0].value;
    const username = profile.displayName;
    const id = profile.id;
    try {
      if (!username || !id || !email)
        return cb("facebook didn't provide a valid profile");
      const user = await findUserOrCreateService({
        email,
        password: "",
        id,
        username,
      });
      return cb(null, user);
    } catch (err) {
      console.error(err);
      return cb("can't register this account right now ");
    }
  }
);

//registrig startegies
passport.use(localStrategyHandler);
passport.use(googleStrategyHandler);
passport.use(facebookStragetyHandler);

//serializtion

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((userId: string, cb) => {
  process.nextTick(async () => {
    const userFromDB = await findUserById(userId);
    // if (!userFromDB) return cb(null, false);

    // const { password: _, ...userWihtoutPassword } = { ...userFromDB };
    return cb(null, userFromDB);
  });
});
