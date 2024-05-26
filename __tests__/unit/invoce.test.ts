import { connectionPrisma } from "../../src/infra/prisma/prisma";
import { ExtractDataFileDashBoardUseCase } from "../../src/application/useCase/dashboard/extract-data-file-dashboard-use-case";
import { InvoiceRepositoryDataBase } from "../../src/infra/repositore-data-base-prisma/invoice-repository-data-base";
import { ExtractDataFileDashBoardFactory } from "../../src/infra/facotry/abstract-factory/invoice/extract-data-file-dashboard-factory";
import { FetchAllInvoiceFactory } from "../../src/infra/facotry/abstract-factory/invoice/fetch-all-invoice-factory";
import {
  EnergyDetails,
  GdiDetails,
  IcmsDetails,
} from "../../src/domain/subentities/invoice";
import { Invoice } from "../../src/domain/entity/invoice";
describe("Testa a camada Use Case extract", () => {
  test("Deveria busacar os invocies para dashboard referente ao UseCase ", async function () {
    const invoceRepository = new InvoiceRepositoryDataBase(connectionPrisma);
    const useCaseDashBoard = new ExtractDataFileDashBoardUseCase(
      invoceRepository
    );
    const reponseInvoces = await useCaseDashBoard.execute();
    expect(reponseInvoces.invoicesEnergia.length > 0).toBe(true);
  });
  test("Deveria busacar os invocies para dashboard referente ao Factory ", async function () {
    const extractDataFileDashBoardFactory = ExtractDataFileDashBoardFactory.ExtractDataFileDashBoardFactory(
      connectionPrisma
    );
    const invocesDashBorad = await extractDataFileDashBoardFactory.execute(
      "7005400387"
    );
    expect(invocesDashBorad.invoicesEnergia.length > 0).toBe(true);
  });

  test("Deveria criar um invoice no repositorio", async function () {
    const energyDetails: EnergyDetails = {
      quantityEnergy: "100", // valor fictício
      priceEnergy: "50", // valor fictício
      unityTariffEnergy: "0.5", // valor fictício
      amountOfEnergyInject: "0", // valor fictício
      priceOfEnergyInject: "0", // valor fictício
      unityTariffOfEnergyInject: "0", // valor fictício
    };

    const icmsDetails: IcmsDetails = {
      amountIcms: "20", // valor fictício
      priceIcms: "10", // valor fictício
      unityIcms: "0.2", // valor fictício
    };

    const gdiDetails: GdiDetails = {
      amountGDI: "0", // valor fictício
      priceGDI: "0", // valor fictício
      unityGDI: "0", // valor fictício
    };

    const invoiceProps = {
      userId: "7005400387", // valor fictício
      installationNumber: "123", // valor fictício
      monthReferring: "January 2024", // valor fictício
      expirationDate: "2024-01-31", // valor fictício
      amountToBePaid: "100", // valor fictício
      publicContribution: "10", // valor fictício
      path: "/invoices/invoice123.pdf", // valor fictício
      energyDetails: energyDetails,
      icmsDetails: icmsDetails,
      gdiDetails: gdiDetails,
    };

    const fakeInvoice = new Invoice(invoiceProps);
    const repositoryDataBase = new InvoiceRepositoryDataBase(connectionPrisma);
    const invoiceRepository = await repositoryDataBase.create(fakeInvoice);
   

    expect(invoiceRepository.userId).toBe(fakeInvoice.userId);
  });

  test("Deveria retornal todos o invoces da factory",async function(){
    const invoceFactory = FetchAllInvoiceFactory.FetchAllUserAbstractFacotory(connectionPrisma);
    const invoices = await invoceFactory.execute(0,2);
    expect(invoices.length>0).toBe(true);
  })
});
