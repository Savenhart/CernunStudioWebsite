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

    async findAll(){
        return await this.repository.findAll().then((data) => {
            return data;
        })
    }

    async findByName(userName: string){
        return await this.repository.findByName(userName).then((data) => {
            return data;
        });
    }

    async findById(id:number){
        return await this.repository.findById(id).then((data) => {
            return data;
        })
    }

    async deleteById(id: number){
        this.repository.deleteById(id);
    }

    async updateById(id:number, user:User){
        return this.repository.updateById(id, user);
    }
}