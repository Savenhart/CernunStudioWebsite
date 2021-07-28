export class User {
    userName!: string;
    password!: string;
    id!: number;


    // constructor(userName?:string, password?:string, id?: number) {
    //     this.userName = userName || "";
    //     this.password = password || "";
    //     this.id = id || -1;
    // }
    constructor(obj: object) {
        Object.assign(this, obj)
    }
}