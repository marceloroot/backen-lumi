import { Invoice } from "../../../domain/entity/invoice";
import { User } from "../../../domain/entity/user";
import { InvoiceRepository } from "../../../domain/repository/invoice-repository";
import { UserRepository } from "../../../domain/repository/user-repository";
import { ProcessPDFService, namesSpace } from "../../services/extract";
import { getItensInvoiceI } from "../../services/interfaces";





export class ExtracDataFileUseCase {
  constructor(
     private useRepository: UserRepository,
     private invoceRepository: InvoiceRepository,
     private extractService:ProcessPDFService 
  ) {}

  async execute(): Promise<void> {
    const dataFiles= await this.extractService.execute();
    
    dataFiles.map(async (dataFile) =>{
       const user = await this.useRepository.findById(dataFile.client.numberClient);
       console.log("USERDFFDDFD",user)
       if(user === null){
          const user  = new User({
            id: dataFile.client.numberClient,
            createdAt: new Date(),
          })
          await this.useRepository.create(user)
       }
      
       let dataEnergia:getItensInvoiceI = {
          name:namesSpace.energia,
          quantity:'',
          unityTariff:"",
          price:"",
          error:null
       };
       let dataEjeatada:getItensInvoiceI = {
        name:namesSpace.ejetato,
        quantity:'',
        unityTariff:"",
        price:"",
        error:null
       };

       let dataICMS:getItensInvoiceI= {
        name:namesSpace.ICMS,
        quantity:'',
        unityTariff:"",
        price:"",
        error:null
       };
       let dataGDI:getItensInvoiceI= {
        name:namesSpace.GDI,
        quantity:'',
        unityTariff:"",
        price:"",
        error:null
       };
       
       dataFile.getInvoices.forEach(item=>{
        if(item.name === namesSpace.energia){
           dataEnergia.quantity = item.quantity;
           dataEnergia.unityTariff = item.unityTariff;
           dataEnergia.price = item.price;
        }
        if(item.name === namesSpace.ejetato){
          dataEjeatada.quantity = item.quantity;
          dataEjeatada.unityTariff = item.unityTariff;
          dataEjeatada.price = item.price;
       }
       if(item.name === namesSpace.ICMS){
        dataICMS.quantity = item.quantity;
        dataICMS.unityTariff = item.unityTariff;
        dataICMS.price = item.price;
       }
       if(item.name === namesSpace.GDI){
        dataGDI.quantity = item.quantity;
        dataGDI.unityTariff = item.unityTariff;
        dataGDI.price = item.price;
       }
       })

            

     const invoce:Invoice = new Invoice({
      publicContribution:dataFile.publicContribution.price,
      amountToBePaid:dataFile.dueDateAndValues.amountToBePaid,
      expirationDate:dataFile.dueDateAndValues.expirationDate,
      numeroInstalcao:dataFile.client.numberInstalation,
      monthReferring:dataFile.dueDateAndValues.monthReferring,
      userId:dataFile.client.numberClient,
      quantityEnergy:dataEnergia.quantity,
      unityTariffEnergy:dataEnergia.unityTariff,
      priceEnergy:dataEnergia.price,
      amountIcms:dataICMS.quantity,
      unityIcms:dataICMS.unityTariff,
      priceIcms: dataICMS.price,
      amountOfEnergyInject:dataEjeatada.quantity,
      unityTariffOfEnergyInject:dataEjeatada.unityTariff,
      priceOfEnergyInject:dataEjeatada.price,
      amountGDI:dataGDI.quantity,
      unityGDI:dataGDI.unityTariff,
      priceGDI:dataGDI.price,
      path:dataFile.path
      
     })
     console.log("invoice@##############",invoce)

       this.invoceRepository.create(invoce)
    })
    

  }
}

