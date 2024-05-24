
import { ExtractDataFileDashBoardUseCase } from "../../../../application/useCase/dashboard/extract-data-file-dashboard-use-case";
import { InvoiceRepositoryDataBase } from "../../../repositore-data-base-prisma/invoice-repository-data-base"

import { PrismaClient } from "@prisma/client";

export class ExtractDataFileDashBoardFactory {
  

  static ExtractDataFileDashBoardFactory(prisma: PrismaClient): ExtractDataFileDashBoardUseCase{
    const invoceRepository = new InvoiceRepositoryDataBase(prisma);
    return  new  ExtractDataFileDashBoardUseCase(invoceRepository);
  }
 
}


