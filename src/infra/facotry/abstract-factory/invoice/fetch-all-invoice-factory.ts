import { PrismaClient } from "@prisma/client";

import { InvoiceRepositoryDataBase } from "../../../repositore-data-base-prisma/invoice-repository-data-base";
import { FetchAllInvoicesUseCase } from "../../../../application/useCase/invoice/fetch-all-invoces-use-case";

export class FetchAllInvoiceFactory{
      static FetchAllUserAbstractFacotory(prisma:PrismaClient):FetchAllInvoicesUseCase {
          const userRepositoryDataBase = new InvoiceRepositoryDataBase(prisma);
          return new FetchAllInvoicesUseCase(userRepositoryDataBase);
      }
}