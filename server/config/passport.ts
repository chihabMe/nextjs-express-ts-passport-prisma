import passport from "passport";
import Strategy from "passport-local";
import { findUserByEmail, findUserById } from "../services/accounts.services";
import { comparePassword } from "../lib/auth.libs";
import { userInfo } from "os";
import { User } from "@prisma/client";

const LocalStrategy = Strategy.Strategy;

passport.use(
  new LocalStrategy((username, password, cb) => {
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
  })
);

passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser((userId: string, cb) => {
  process.nextTick(async () => {
    const userFromDB = await findUserById(userId);
    // if (!userFromDB) return cb(null, false);

    // const { password: _, ...userWihtoutPassword } = { ...userFromDB };
    return cb(null, userFromDB);
  });
});
