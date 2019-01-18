import {User} from "../entity/User";

export class UserService {


    async findUser(id: string) {
        let user = await User.findOne({where: {id: id}});
        return user
    }

    async addUser(user: User) {
        await User.save(user);
    }

    async checkRights(userid: string){
        return await User.findOne({where: {id: userid, isAdmin: true}});
    }
}