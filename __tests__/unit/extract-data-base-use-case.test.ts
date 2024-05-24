import { ProcessPDFService } from "../../src/application/services/extract";
import { connectionPrisma } from "../../src/infra/prisma/prisma";
import { InvoiceRepositoryDataBase } from "../../src/infra/repositore-data-base-prisma/invoice-repository-data-base";
import { ExtractDataFileUseCaseFactory } from "../../src/infra/facotry/abstract-factory/invoice/extract-data-file-use-case-factory";
import { UserRepositoryDataBase } from "../../src/infra/repositore-data-base-prisma/user-repository-data-base";
import { ExtractDataFileUseCase } from "../../src/application/useCase/invoice/extract-data-file-and-saved-use-case";
describe("Testa a camada Use Case extract", () => {
  test("Deveria salvar no banco de dados os invoices e usuarios referente ao UseCase ", async function () {
    //const primsa =  new PrismaClient();
    const useRepository = new UserRepositoryDataBase(connectionPrisma);
    const invoceRepository = new InvoiceRepositoryDataBase(connectionPrisma);
    const extractService = new ProcessPDFService();
    const extratdd = new ExtractDataFileUseCase(
      useRepository,
      invoceRepository,
      extractService
    );
    const response = await extratdd.execute();

    expect(response).toBe("Dados Inseridos");
  },10000);

  test("Deveria salvar no banco de dados os invoices e usuarios referente ao Factory ", async function () {
    const extractAbstractFacture = ExtractDataFileUseCaseFactory.ExtractDataFileAbstractFactory(
      connectionPrisma
    );
    const response = await extractAbstractFacture.execute();
    expect(response).toBe("Dados Inseridos");
  },10000);
});