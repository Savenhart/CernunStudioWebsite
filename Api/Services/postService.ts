import { Post } from "../Models/postModel";
import { User } from "../Models/userModels";
import { postRepository } from "../Repositories/postRepository";

export class postService{
    private repository: postRepository;

    constructor(){
        this.repository = new postRepository();
    }

    async findAll(){
        return this.repository.findAll().then((datas) => {

            
            let posts: Post[] = [];
            for (const data of datas) {
                let user = new User({id: data.user_id, userName: data.username});
                let post = new Post({id: data.ID, title: data.title, user: user, date: data.post_date, content: data.content});
                posts.push(post);
            }
            return posts;
        }).catch((err) => {
            console.log(err);
            
        });
    }

    async create(post: Post){
        this.repository.save(post);
    }

    async findById(id: number){
        return this.repository.findById(id).then((data) => {
            let user = new User({id: data[0].user_id, userName: data[0].username});
            let post = new Post({id: data[0].ID, title: data[0].title, user: user, date: data[0].post_date, content: data[0].content});
            return post;
        }).catch((err) => {
            console.log(err);
            
        });
    }
}