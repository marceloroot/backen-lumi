import { PrismaClient } from "@prisma/client";
import { Invoice } from "../../domain/entity/invoice";
import { InvoiceRepository } from "../../domain/repository/invoice-repository";

export class InvoiceRepositoryDataBase implements InvoiceRepository {
  constructor(private prismaClient: PrismaClient) {}

  async create(invoice: Invoice): Promise<Invoice> {
    await this.prismaClient.invoce.create({
      data: {
        numeroInstalcao: invoice.numeroInstalcao,
        monthReferring: invoice.monthReferring,
        expirationDate: invoice.expirationDate,
        amountToBePaid: invoice.amountToBePaid,
        publicContribution: invoice.publicContribution,
        userId: invoice.userId,
        path: invoice.path,

        // Energy details
        quantityEnergy: invoice.energyDetails?.quantityEnergy,
        priceEnergy: invoice.energyDetails?.priceEnergy,
        unityTariffEnergy: invoice.energyDetails?.unityTariffEnergy,
        amountOfEnergyInject: invoice.energyDetails?.amountOfEnergyInject,
        priceOfEnergyInject: invoice.energyDetails?.priceOfEnergyInject,
        unityTariffOfEnergyInject: invoice.energyDetails?.unityTariffOfEnergyInject,

        // ICMS details
        amountIcms: invoice.icmsDetails?.amountIcms,
        priceIcms: invoice.icmsDetails?.priceIcms,
        unityIcms: invoice.icmsDetails?.unityIcms,

        // GDI details
        amountGDI: invoice.gdiDetails?.amountGDI,
        priceGDI: invoice.gdiDetails?.priceGDI,
        unityGDI: invoice.gdiDetails?.unityGDI,
      },
    });
    return invoice;
  }
}
