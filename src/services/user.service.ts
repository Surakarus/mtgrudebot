import {User} from "../entity/User";

export class UserService {


    async findUser(id: string) {
        let user = await User.findOne({where: {id: id}});
        console.log(user);
        return user
    }

    async addUser(user: User) {
        await User.save(user);
    }

}