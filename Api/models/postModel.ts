import { User } from "./userModels"

export class Post {

    user!: User;
    title!: string;
    date!: Date;
    content!: string;
    ID!: number;

    constructor(obj: object) {
        Object.assign(this, obj)
    }
}