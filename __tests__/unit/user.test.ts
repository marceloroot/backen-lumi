
import { User } from "../../src/domain/entity/user";
import { UserRepositoryDataBase } from "../../src/infra/repositore-data-base-prisma/user-repository-data-base";
import { connectionPrisma } from '../../src/infra/prisma/prisma';
import { randomUUID } from "crypto";
describe('User Test', () => {

test("Deveria criar um usuario no repositorio", async function(){
    const idUser = randomUUID();
  const user = new User ({
    id:idUser,
    createdAt:new Date(),
  })
 const repositoryDataBase = new  UserRepositoryDataBase(connectionPrisma)
 const userRepository = await repositoryDataBase.create(user)
 console.log(userRepository)

 expect(userRepository.id).toBe(user.id)
});

test("Deveria buscar um por id usuario no repositorio", async function(){


 const repositoryDataBase = new  UserRepositoryDataBase(connectionPrisma)
 const userRepository = await repositoryDataBase.findById('7005400387')
 console.log(userRepository)

 expect(userRepository?.id).toBe('7005400387')
});

})


