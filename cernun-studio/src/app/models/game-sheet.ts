import { GameImageModel } from "./game-image-model";

export class GameSheet {
    id!: number;
    name!: string;
    date!: Date;
    content!: string;
    images!: GameImageModel[];
    link!: string;

    constructor(obj?: Object) {
      Object.assign(this, obj)
    }
}
