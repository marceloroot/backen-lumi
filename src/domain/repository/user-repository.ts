import { User } from "../entity/user";
//poderia usar o I do SOLID Interfce Segragation
export interface UserRepository {
  create(user:User): Promise<User>;
  findById(id:string): Promise<User | undefined>;
  findAll(): Promise<User[]>;

}
