
import { Invoice as InvoicePrisma } from "@prisma/client";
import { Invoice } from "../../../domain/entity/invoice";
import { User } from "../../../domain/entity/user";


export class InvoiceMapper {
    static toEntity(data: InvoicePrisma | (InvoicePrisma & { user: User })): Invoice {
        const invoiceProps = {
          id:data.id,
          userId: data.userId,
          installationNumber: data.installationNumber,
          monthReferring: data.monthReferring,
          expirationDate: data.expirationDate,
          amountToBePaid: data.amountToBePaid,
          publicContribution: data.publicContribution,
          path: data.path,
          energyDetails: {
            quantityEnergy: data.quantityEnergy ?? '',
            priceEnergy: data.priceEnergy ?? '',
            unityTariffEnergy: data.unityTariffEnergy ?? '',
            amountOfEnergyInject: data.amountOfEnergyInject ?? '',
            priceOfEnergyInject: data.priceOfEnergyInject ?? '',
            unityTariffOfEnergyInject: data.unityTariffOfEnergyInject ?? '',
          },
          icmsDetails: {
            amountIcms: data.amountIcms ?? '',
            priceIcms: data.priceIcms ?? '',
            unityIcms: data.unityIcms ?? '',
          },
          gdiDetails: {
            amountGDI: data.amountGDI ?? '',
            priceGDI: data.priceGDI ?? '',
            unityGDI: data.unityGDI ?? '',
          },
        };
    
        const user = 'user' in data ? data.user : undefined;
    
        return new Invoice(invoiceProps, user);
      }
  
  static invoceMapper(data: InvoicePrisma): Invoice {
    return new Invoice({
      id:data.id,
      userId: data.userId,
      installationNumber: data.installationNumber,
      monthReferring: data.monthReferring,
      expirationDate: data.expirationDate,
      amountToBePaid: data.amountToBePaid,
      publicContribution: data.publicContribution,
      path: data.path,
      energyDetails: {
        quantityEnergy: data.quantityEnergy ?? '',
        priceEnergy: data.priceEnergy ?? '',
        unityTariffEnergy: data.unityTariffEnergy ?? '',
        amountOfEnergyInject: data.amountOfEnergyInject ?? '',
        priceOfEnergyInject: data.priceOfEnergyInject ?? '',
        unityTariffOfEnergyInject: data.unityTariffOfEnergyInject ?? '',
      },
      icmsDetails: {
        amountIcms: data.amountIcms ?? '',
        priceIcms: data.priceIcms ?? '',
        unityIcms: data.unityIcms ?? '',
      },
      gdiDetails: {
        amountGDI: data.amountGDI ?? '',
        priceGDI: data.priceGDI ?? '',
        unityGDI: data.unityGDI ?? '',
      },
    });
  }
}
