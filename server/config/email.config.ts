const getEmailConfig = () => {
  const user = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASSWORD;
  const serverEmail = process.env.SERVER_EMAIL;

  if (!user) throw new Error("EMAIL USRE IS RQUIRED");
  if (!password) throw new Error("EMAIL PASSWORD IS RQUIRED");
  if (!serverEmail) throw new Error("EMAIL SERVER_EMAIL IS RQUIRED");
  return { user, password, serverEmail };
};

export default getEmailConfig;
