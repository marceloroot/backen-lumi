import { PrismaClient } from "@prisma/client";
import { UserRepositoryDataBase } from "../../../repositore-data-base-prisma/user-repository-data-base";
import { FetchAllUsersUseCase } from "../../../../application/useCase/user/fetch-all-users-use-case";

export class FetchAllUserFactory{
      static FetchAllUserAbstractFacotory(prisma:PrismaClient):FetchAllUsersUseCase {
          const userRepositoryDataBase = new UserRepositoryDataBase(prisma);
          return new FetchAllUsersUseCase(userRepositoryDataBase);

         
      }
}