
import { User } from "../../src/domain/entity/user";
import { UserRepositoryDataBase } from "../../src/infra/repositore-data-base-prisma/user-repository-data-base";
import { FetchAllUserFactory } from "../../src/infra/facotry/abstract-factory/user/fetch-all-user-factory";
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
 expect(userRepository.id).toBe(user.id)
});

test("Deveria buscar um por id usuario no repositorio", async function(){
 const repositoryDataBase = new  UserRepositoryDataBase(connectionPrisma)
 const userRepository = await repositoryDataBase.findById('7005400387')
 expect(userRepository?.id).toBe('7005400387')
});

test("Deveria buscar todos os  usuarios no factory", async function(){
  const fetchALlUserFactorye = FetchAllUserFactory.FetchAllUserAbstractFacotory(connectionPrisma)
 const allUsers = await fetchALlUserFactorye.execute();
 expect(allUsers.length > 0).toBe(true)
});

})


