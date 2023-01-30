import { User } from "@prisma/client";

interface IUser extends User {
  email: string;
}

export default IUser;
