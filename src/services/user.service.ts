import {User} from "../entity/User";

export class UserService {

    async findUser(id: string) {
        return await User.findOne({where: {id: id}});
    }

    async addUser(user: User) {
        return await User.save(user);
    }

    async checkRights(userid: string){
        return await User.findOne({where: {id: userid, isAdmin: true}});
    }
}