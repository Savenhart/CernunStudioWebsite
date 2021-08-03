export class User {
    userName!: string;
    password!: string;
    ID!: number;

    constructor(obj: object) {
        Object.assign(this, obj)
    }
}