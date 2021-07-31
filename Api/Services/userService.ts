import { User } from "../Models/userModels";
import { userRepository } from "../Repositories/userRepository";


export class userService{

    private repository: userRepository;

    constructor(){
        this.repository = new userRepository();
    }
    async create(user: User){
        this.repository.save(user);
    }

    async findByName(userName: string){
        return await this.repository.findByName(userName).then((data) => {
            return data;
        });
    }
}