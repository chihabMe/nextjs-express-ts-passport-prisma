const getEmailConfig = () => {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  const user = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASSWORD;
  const serverEmail = process.env.SERVER_EMAIL;

  if (!host) throw new Error("EMAIL HOST IS RQUIRED");
  if (!port) throw new Error("EMAIL PORT IS RQUIRED");
  if (!user) throw new Error("EMAIL USRE IS RQUIRED");
  if (!password) throw new Error("EMAIL PASSWORD IS RQUIRED");
  if (!serverEmail) throw new Error("EMAIL SERVER_EMAIL IS RQUIRED");
  return { host, port: parseInt(port), user, password, serverEmail };
};

export default getEmailConfig;
