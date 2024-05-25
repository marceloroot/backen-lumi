import { User } from "../../../domain/entity/user";
import { UserRepository } from "../../../domain/repository/user-repository";

export class FetchAllUsersUseCase{
    constructor(private repositoryUser: UserRepository){}
     async execute():Promise<User[]>{
        const users = await this.repositoryUser.findAll();
        return users;
     }
}
