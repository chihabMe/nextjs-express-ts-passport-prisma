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
    callbackURL: "http://localhost:3000/api/auth/callback/google/",
  },
  async (acessToken, refreshToken, profile, cb) => {
    if (!profile || profile == undefined)
      return cb("google didn't provide a profile");
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
    callbackURL: "http://localhost:3000/api/auth/callback/facebook/",
    clientID: process.env.FACEBOOK_CLIENT_ID ?? "",
    clientSecret: process.env.FACEBOOK_SECRET ?? "",
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    return cb("error");
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
