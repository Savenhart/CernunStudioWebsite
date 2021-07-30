export class User {
    userName!: string;
    password!: string;


    constructor(obj: object) {
        Object.assign(this, obj)
    }
}
