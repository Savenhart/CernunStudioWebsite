export class GameImageModel {
    id!: string;
    name!: string;
    link!: string;
    gameId!: string;

    constructor(obj?: Object) {
      Object.assign(this, obj)
    }
}
