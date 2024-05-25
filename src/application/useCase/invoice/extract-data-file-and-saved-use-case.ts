import { Invoice } from "../../../domain/entity/invoice";
import { User } from "../../../domain/entity/user";
import { InvoiceRepository } from "../../../domain/repository/invoice-repository";
import { UserRepository } from "../../../domain/repository/user-repository";
import {
  EnergyDetails,
  GdiDetails,
  IcmsDetails,
} from "../../../domain/subentities/invoice";
import { DeleteFile } from "../../services/delele-arquivo";
import { ProcessPDFService, namesSpace } from "../../services/extract";
import { getItensInvoiceI } from "../../services/interfaces";

export class ExtractDataFileUseCase {
  constructor(
    private useRepository: UserRepository,
    private invoiceRepository: InvoiceRepository,
    private extractService: ProcessPDFService
  ) {}

  async execute(): Promise<string> {
    //REFATORA ESTA QUEBRANDO O PRINCIOPIO D do Solid 
    const dataFiles = await this.extractService.execute();
    try {
      for (const dataFile of dataFiles) {
       
       if(dataFile.client.numberClient){
  
        const userFindById = await this.useRepository.findById(
          dataFile.client.numberClient
        );
       
        if (!userFindById) {
          const newUser = new User({
            id: dataFile.client.numberClient,
            createdAt: new Date(),
          });
          await this.useRepository.create(newUser);
        }
        let dataEnergia: getItensInvoiceI = {
          name: namesSpace.energia,
          quantity: "",
          unityTariff: "",
          price: "",
          error: null,
        };
        let dataEjeatada: getItensInvoiceI = {
          name: namesSpace.ejetato,
          quantity: "",
          unityTariff: "",
          price: "",
          error: null,
        };
        let dataICMS: getItensInvoiceI = {
          name: namesSpace.ICMS,
          quantity: "",
          unityTariff: "",
          price: "",
          error: null,
        };
        let dataGDI: getItensInvoiceI = {
          name: namesSpace.GDI,
          quantity: "",
          unityTariff: "",
          price: "",
          error: null,
        };

        dataFile.getInvoices.forEach((item) => {
          if (item.name === namesSpace.energia) {
            dataEnergia.quantity = item.quantity;
            dataEnergia.unityTariff = item.unityTariff;
            dataEnergia.price = item.price;
          }
          if (item.name === namesSpace.ejetato) {
            dataEjeatada.quantity = item.quantity;
            dataEjeatada.unityTariff = item.unityTariff;
            dataEjeatada.price = item.price;
          }
          if (item.name === namesSpace.ICMS) {
            dataICMS.quantity = item.quantity;
            dataICMS.unityTariff = item.unityTariff;
            dataICMS.price = item.price;
          }
          if (item.name === namesSpace.GDI) {
            dataGDI.quantity = item.quantity;
            dataGDI.unityTariff = item.unityTariff;
            dataGDI.price = item.price;
          }
        });

        const energyDetails: EnergyDetails = {
          quantityEnergy: dataEnergia.quantity,
          priceEnergy: dataEnergia.price,
          unityTariffEnergy: dataEnergia.unityTariff,
          amountOfEnergyInject: dataEjeatada.quantity,
          priceOfEnergyInject: dataEjeatada.price,
          unityTariffOfEnergyInject: dataEjeatada.unityTariff,
        };

        const icmsDetails: IcmsDetails = {
          amountIcms: dataICMS.quantity,
          priceIcms: dataICMS.price,
          unityIcms: dataICMS.unityTariff,
        };

        const gdiDetails: GdiDetails = {
          amountGDI: dataGDI.quantity,
          priceGDI: dataGDI.price,
          unityGDI: dataGDI.unityTariff ? dataGDI.unityTariff : "",
        };

        const invoice: Invoice = new Invoice({
          userId: dataFile.client.numberClient,
          installationNumber: dataFile.client.numberInstalation,
          monthReferring: dataFile.dueDateAndValues.monthReferring,
          expirationDate: dataFile.dueDateAndValues.expirationDate,
          amountToBePaid: dataFile.dueDateAndValues.amountToBePaid,
          publicContribution: dataFile.publicContribution.price,
          path: dataFile.path,
          energyDetails: energyDetails,
          icmsDetails: icmsDetails,
          gdiDetails: gdiDetails,
        });
        const invoiceExist = await this.invoiceRepository.findExist(dataFile.client.numberClient,dataFile.client.numberInstalation,dataFile.dueDateAndValues.monthReferring);
        
        if(invoiceExist.length <= 0) await this.invoiceRepository.create(invoice);
      
       }else{
        DeleteFile(dataFile.path)
       }
      }

      return "Dados Inseridos";

    } catch (err) {
      console.error("Erro ao inserir dados:", err);
      return "Erro ao inserir Dados";
    }
  }
}
