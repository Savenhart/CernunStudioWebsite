export class Image {

    name!: string;
    gameId!: number;
    link!: string;
    id!: number;

    constructor(obj: object) {
        Object.assign(this, obj)
    }
}