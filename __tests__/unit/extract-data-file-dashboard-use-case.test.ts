import { connectionPrisma } from "../../src/infra/prisma/prisma";
import {ExtractDataFileDashBoardUseCase} from '../../src/application/useCase/dashboard/extract-data-file-dashboard-use-case'
import { InvoiceRepositoryDataBase } from "../../src/infra/repositore-data-base-prisma/invoice-repository-data-base";
describe("Testa a camada Use Case extract", () => {
  test("Deveria busacar os invocies para dashboard referente ao UseCase ", async function () {
    const invoceRepository = new InvoiceRepositoryDataBase(connectionPrisma);
   const useCaseDashBoard = new  ExtractDataFileDashBoardUseCase(invoceRepository);
   const reponseInvoces = await useCaseDashBoard.execute();
  console.log(reponseInvoces.invoices[0].user)
    expect(reponseInvoces.invoices.length>0).toBe(true);
  });

});
