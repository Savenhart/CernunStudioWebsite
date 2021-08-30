import { Image } from "./imageModel";

export class Game {

    name!: string;
    date!: Date;
    content!: string;
    image!: Image[];
    ID!: number;

    constructor(obj: object) {
        Object.assign(this, obj)
    }
}