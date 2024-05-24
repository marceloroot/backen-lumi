import { DashBoardDTO } from "./DTO/dasboard-DTO";
import { InvoiceRepository } from "../../../domain/repository/invoice-repository";

export class ExtractDataFileDashBoardUseCase {
  constructor(
    private invoiceRepository: InvoiceRepository,
  ) {}

  async execute(userId?: string): Promise<DashBoardDTO> {
    try {
      const invoices = await this.invoiceRepository.findAllUser(userId);

      if (!invoices.length) {
        throw new Error("No invoices found for the given user.");
      }

      // Extracting user from the first invoice assuming all invoices belong to the same user
      const user = invoices[0].user;
      if (!user) {
        throw new Error("User information not found for the given invoice.");
      }
      let electricPowerConsumption = 0;
      let compensatedEnergy =0;
      let totalValueWithoutGD =0;
      let economiaGD = 0;
      for (const invoice of invoices) {
          const energiaKWH = invoice.energyDetails?.quantityEnergy ? parseFloat(invoice.energyDetails.quantityEnergy) : 0;
          const energiaICMSKWH = invoice.icmsDetails?.amountIcms ? parseFloat(invoice.icmsDetails.amountIcms) : 0;
          electricPowerConsumption = energiaKWH + energiaICMSKWH;
          compensatedEnergy = invoice.gdiDetails?.amountGDI ? parseFloat(invoice.gdiDetails.amountGDI) : 0
          const priceEnergy = invoice.energyDetails?.priceEnergy ? parseFloat(invoice.energyDetails.priceEnergy) : 0
          const priceICMS = invoice.icmsDetails?.priceIcms ? parseFloat(invoice.icmsDetails?.priceIcms) : 0
          const pricePublic = invoice.publicContribution ? parseFloat(invoice.publicContribution) : 0
          totalValueWithoutGD = priceEnergy + priceICMS + pricePublic;
          economiaGD  = invoice.gdiDetails?.priceGDI ? parseFloat(invoice.gdiDetails.priceGDI) : 0
          
      }
      let retornoDash: DashBoardDTO = {
        electricPowerConsumption:electricPowerConsumption,
        compensatedEnergy: compensatedEnergy,  // Placeholder value
        economiaGD:economiaGD,  // Placeholder value
        totalValueWithoutGD: totalValueWithoutGD,  // Placeholder value
        invoices:invoices
      };

      return retornoDash;

    } catch (err) {
      console.error("Erro ao inserir dados:", err);
      throw new Error('Erro ao inserir dados');
    }
  }
}
