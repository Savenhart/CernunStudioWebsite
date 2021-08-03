import { User } from "./user";

export class Post {
  title!: string;
  user!: User;
  date!: Date;
  content!: string;
  id!: string

  constructor(obj?: Object) {
    Object.assign(this, obj)
  }
}
