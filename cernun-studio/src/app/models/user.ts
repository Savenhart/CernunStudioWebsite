export class User {
    userName!: string;
    password!: string;
    id!: string;


    constructor(obj: object) {
        Object.assign(this, obj)
    }
}
