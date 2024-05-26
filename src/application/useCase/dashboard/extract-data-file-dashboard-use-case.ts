import {
  DashBoardDTO,
  InvoiceEnergia,
  InvoiceUsers,
  MonetaryValues,
} from "./DTO/dasboard-DTO";
import { InvoiceRepository } from "../../../domain/repository/invoice-repository";

export class ExtractDataFileDashBoardUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(userId?: string): Promise<DashBoardDTO> {
    try {
      const invoices = await this.invoiceRepository.findAllUser(userId);
      if (!invoices.length) {
        const dataClean:DashBoardDTO={
          compensatedEnergy:0,
          economiaGD:0,
          electricPowerConsumption:0,
          invoicesEnergia:[],
          invoiceUsers:[],
          monetaryValues:[],
          totalValueWithoutGD:0
          
        };
        return dataClean
      }
      const user = invoices[0].user;
      if (!user) {
        throw new Error("User information not found for the given invoice.");
      }
      let electricPowerConsumption = 0;
      let compensatedEnergy = 0;
      let totalValueWithoutGD = 0;
      let economiaGD = 0;
      const invoiceUsers: InvoiceUsers[] = [];
     
      const groupedInvoices: { [key: string]: InvoiceEnergia } = {};
      const groupedMonetaryValues: { [key: string]: MonetaryValues } = {};
      for (const invoice of invoices) {
        const energiaKWH = invoice.energyDetails?.quantityEnergy
          ? parseFloat(invoice.energyDetails.quantityEnergy)
          : 0;
        const energiaICMSKWH = invoice.icmsDetails?.amountIcms
          ? parseFloat(invoice.icmsDetails.amountIcms)
          : 0;
        electricPowerConsumption += energiaKWH + energiaICMSKWH;
        compensatedEnergy += invoice.gdiDetails?.amountGDI
          ? parseFloat(invoice.gdiDetails.amountGDI)
          : 0;
        const priceEnergy = invoice.energyDetails?.priceEnergy
          ? parseFloat(invoice.energyDetails.priceEnergy)
          : 0;
        const priceICMS = invoice.icmsDetails?.priceIcms
          ? parseFloat(invoice.icmsDetails.priceIcms)
          : 0;
        const pricePublic = invoice.publicContribution
          ? parseFloat(invoice.publicContribution)
          : 0;
        totalValueWithoutGD += priceEnergy + priceICMS + pricePublic;
        economiaGD += invoice.gdiDetails?.priceGDI
          ? parseFloat(invoice.gdiDetails.priceGDI)
          : 0;

        if (!groupedInvoices[invoice.monthReferring]) {
          groupedInvoices[invoice.monthReferring] = {
            name: invoice.monthReferring,
            kwhenergejetada: 0,
            kwhgdi: 0,
            kwhenergia: 0,
            kwhenergiaICMS: 0,
          };
        }
        groupedInvoices[invoice.monthReferring].kwhenergejetada += invoice
          .energyDetails?.amountOfEnergyInject
          ? parseFloat(invoice.energyDetails.amountOfEnergyInject)
          : 0;
        groupedInvoices[invoice.monthReferring].kwhgdi += invoice.gdiDetails
          ?.amountGDI
          ? parseFloat(invoice.gdiDetails.amountGDI)
          : 0;
        groupedInvoices[invoice.monthReferring].kwhenergia += energiaKWH;
        groupedInvoices[
          invoice.monthReferring
        ].kwhenergiaICMS += energiaICMSKWH;

        if (!groupedMonetaryValues[invoice.monthReferring]) {
          groupedMonetaryValues[invoice.monthReferring] = {
            name: invoice.monthReferring,
            energyEjetadaPrice: 0,
            gdiPrice: 0,
            eenergyPrice: 0,
            energyICMSPrice: 0,
          };
        }
        groupedMonetaryValues[
          invoice.monthReferring
        ].energyEjetadaPrice += invoice.energyDetails?.priceOfEnergyInject
          ? parseFloat(invoice.energyDetails.priceOfEnergyInject)
          : 0;
        groupedMonetaryValues[invoice.monthReferring].gdiPrice += invoice
          .gdiDetails?.priceGDI
          ? parseFloat(invoice.gdiDetails.priceGDI)
          : 0;
        groupedMonetaryValues[
          invoice.monthReferring
        ].eenergyPrice += priceEnergy;
        groupedMonetaryValues[
          invoice.monthReferring
        ].energyICMSPrice += priceICMS;
        const userIndex = invoiceUsers.findIndex(
          (user) => user.clientNumber === invoice.userId
        );
        if (userIndex === -1) {
          const invoiceUser: InvoiceUsers = {
            clientNumber: invoice.userId ? invoice.userId : "",
            instaltionNumber: invoice.installationNumber,
            energyRecent: invoice.energyDetails?.quantityEnergy
              ? invoice.energyDetails.quantityEnergy
              : "0",
            priceRecent: invoice.energyDetails?.priceEnergy
              ? invoice.energyDetails.priceEnergy
              : "0",
            totalEnergy: parseFloat(
              invoice.energyDetails?.quantityEnergy || "0"
            ),
            totalPrice: parseFloat(invoice.energyDetails?.priceEnergy || "0"),
          };
          invoiceUsers.push(invoiceUser);
        } else {
          invoiceUsers[userIndex].totalEnergy += parseFloat(
            invoice.energyDetails?.quantityEnergy || "0"
          );
          invoiceUsers[userIndex].totalPrice += parseFloat(
            invoice.energyDetails?.priceEnergy || "0"
          );
        }
      }
      const groupedInvoiceArray = Object.values(groupedInvoices);
      const groupedMonetaryValuesArray = Object.values(groupedMonetaryValues);
      
      let retornoDash: DashBoardDTO = {
        electricPowerConsumption: electricPowerConsumption,
        compensatedEnergy: compensatedEnergy,
        economiaGD: economiaGD,
        totalValueWithoutGD: totalValueWithoutGD,
        invoicesEnergia: groupedInvoiceArray,
        invoiceUsers: invoiceUsers,
        monetaryValues: groupedMonetaryValuesArray,
      };
      return retornoDash;
    } catch (err) {
      console.error("Erro ao inserir dados:", err);
      throw new Error("Erro ao buscar invoice");
    }
  }
}
