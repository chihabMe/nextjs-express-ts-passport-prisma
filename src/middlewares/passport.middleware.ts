passport.use(
  new LocalStrategy((email, password, cb) => {
    const user = User.findFirst({
      where: {
        email,
      },
    });
  })
);
