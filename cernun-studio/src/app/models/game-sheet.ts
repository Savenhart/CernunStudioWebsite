export class GameSheet {
    id!: string;
    name!: string;
    date!: Date;
    content!: string;
    link!: string;

    constructor(obj?: Object) {
      Object.assign(this, obj)
    }
}
