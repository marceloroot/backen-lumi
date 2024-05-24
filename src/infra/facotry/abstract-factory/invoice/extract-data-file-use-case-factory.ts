import { ProcessPDFService } from "../../../../application/services/extract";
import { ExtractDataFileUseCase } from "../../../../application/useCase/invoice/extract-data-file-and-saved-use-case";

import { InvoiceRepositoryDataBase } from "../../../repositore-data-base-prisma/invoice-repository-data-base";
import { UserRepositoryDataBase } from "../../../repositore-data-base-prisma/user-repository-data-base";

import { PrismaClient } from "@prisma/client";

export class ExtractDataFileUseCaseFactory {
  
  static ExtractDataFileAbstractFactory(prisma: PrismaClient): ExtractDataFileUseCase {
    const useRepository = new UserRepositoryDataBase(prisma);
    const invoceRepository = new InvoiceRepositoryDataBase(prisma);
    const extractService = new ProcessPDFService()
    return new ExtractDataFileUseCase(useRepository,invoceRepository,extractService);
   
  }
 
}
