import { PrismaClient } from "@prisma/client";
import { Invoice } from "../../domain/entity/invoice";
import { InvoiceRepository } from "../../domain/repository/invoice-repository";

export class InvoiceRepositoryDataBase implements InvoiceRepository{
    constructor(private prismaClient: PrismaClient){}
    async create(invoice: Invoice): Promise<Invoice> {
        await this.prismaClient.invoce.create({
            data:{
                numeroInstalcao: invoice.numeroInstalcao,
                monthReferring: invoice.monthReferring,
                expirationDate: invoice.expirationDate,
                amountToBePaid: invoice.amountToBePaid,

                quantityEnergy:invoice.quantityEnergy,
                priceEnergy:invoice.priceEnergy,
                unityTariffEnergy:invoice.unityTariffEnergy,

                amountOfEnergyInject:invoice.amountOfEnergyInject,
                priceOfEnergyInject:invoice.priceOfEnergyInject,
                unityTariffOfEnergyInject:invoice.unityTariffOfEnergyInject,

                amountIcms:invoice.amountIcms,
                priceIcms:invoice.priceIcms,
                unityIcms:invoice.unityIcms,

                amountGDI:invoice.amountGDI,
                priceGDI:invoice.priceGDI,
                unityGDI:invoice.unityGDI,
                publicContribution:invoice.publicContribution,
                userId:invoice.userId,
                path:invoice.path
            }
        })
        return invoice;
    }
}