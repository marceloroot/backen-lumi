import { ProcessPDFService } from "../../../../application/services/extract";
import { ExtracDataFileUseCase } from "../../../../application/useCase/invoce/extract-data-file-use-case";

import { InvoiceRepositoryDataBase } from "../../../repositore-data-base-prisma/invoice-repository-data-base";
import { UserRepositoryDataBase } from "../../../repositore-data-base-prisma/user-repository-data-base";

import { PrismaClient } from "@prisma/client";

export class ExtractDataFileUseCaseFactory {
  
  static ExtractDataFileAbstractFactory(prisma: PrismaClient): ExtracDataFileUseCase {
    const useRepository = new UserRepositoryDataBase(prisma);
    const invoceRepository = new InvoiceRepositoryDataBase(prisma);
    const extractService = new ProcessPDFService()
    return new ExtracDataFileUseCase(useRepository,invoceRepository,extractService);
   
  }

 


 
}
