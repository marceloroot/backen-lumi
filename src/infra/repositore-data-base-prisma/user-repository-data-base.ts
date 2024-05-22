import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entity/user";
import { UserRepository } from "../../domain/repository/user-repository";

export class UserRepositoryDataBase implements UserRepository{
    constructor(private prismaClient: PrismaClient){}
    async create(user: User): Promise<User> {
        const userPrisma = await this.prismaClient.user.create({
          data:{
            id:user.id,
            createdAt: user.createdAt,
          }
        })
        return new User({
            id:userPrisma.id,
            createdAt: userPrisma.createdAt
          })
    }
   async findById(id: string): Promise<User | null> {
      const userPrisma = await this.prismaClient.user.findUnique({
        where:{
          id:id
        }
      })
      if(!userPrisma) return null
      return new User({
        id:userPrisma.id,
        createdAt: userPrisma.createdAt
      })
    }
}