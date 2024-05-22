import { Invoice } from "../../../domain/entity/invoice";
import { User } from "../../../domain/entity/user";
import { InvoiceRepository } from "../../../domain/repository/invoice-repository";
import { UserRepository } from "../../../domain/repository/user-repository";
import { ProcessPDFService, namesSpace } from "../../services/extract";
import { ValorResI } from "../../services/interfaces";





export class ExtracDataFileUseCase {
  constructor(
     private useRepository: UserRepository,
     private invoceRepository: InvoiceRepository,
     private extractService:ProcessPDFService 
  ) {}

  async execute(): Promise<void> {
    const dataFiles= await this.extractService.execute();
    
    dataFiles.map(async (dataFile) =>{
       const user = await this.useRepository.findById(dataFile.cliente.numeroCliente);
       console.log("USERDFFDDFD",user)
       if(user === null){
          const user  = new User({
            id: dataFile.cliente.numeroCliente,
            createdAt: new Date(),
          })
          await this.useRepository.create(user)
       }
      
       let dataEnergia:ValorResI = {
          name:namesSpace.energia,
          quantidadeInicial:'',
          tarifaUnitaria:"",
          valor:"",
          error:null
       };
       let dataEjeatada:ValorResI = {
        name:namesSpace.ejetato,
        quantidadeInicial:'',
        tarifaUnitaria:"",
        valor:"",
        error:null
       };

       let dataICMS:ValorResI= {
        name:namesSpace.ICMS,
        quantidadeInicial:'',
        tarifaUnitaria:"",
        valor:"",
        error:null
       };;
       let dataGDI:ValorResI= {
        name:namesSpace.GDI,
        quantidadeInicial:'',
        tarifaUnitaria:"",
        valor:"",
        error:null
       };;
       dataFile.valoresArray.forEach(item=>{
        if(item.name === namesSpace.energia){
           dataEnergia.quantidadeInicial = item.quantidadeInicial;
           dataEnergia.tarifaUnitaria = item.tarifaUnitaria;
           dataEnergia.valor = item.valor;
        }
        if(item.name === namesSpace.ejetato){
          dataEjeatada.quantidadeInicial = item.quantidadeInicial;
          dataEjeatada.tarifaUnitaria = item.tarifaUnitaria;
          dataEjeatada.valor = item.valor;
       }
       if(item.name === namesSpace.ICMS){
        dataICMS.quantidadeInicial = item.quantidadeInicial;
        dataICMS.tarifaUnitaria = item.tarifaUnitaria;
        dataICMS.valor = item.valor;
       }
       if(item.name === namesSpace.GDI){
        dataGDI.quantidadeInicial = item.quantidadeInicial;
        dataGDI.tarifaUnitaria = item.tarifaUnitaria;
        dataGDI.valor = item.valor;
       }
       })

            

     const invoce:Invoice = new Invoice({
      publicContribution:dataFile.contribuicaoPublica.valor,
      amountToBePaid:dataFile.vencimentos.valorAPagar,
      expirationDate:dataFile.vencimentos.vencimento,
      numeroInstalcao:dataFile.cliente.numeroInstalcao,
      monthReferring:dataFile.vencimentos.refereenteA,
      userId:dataFile.cliente.numeroCliente,
      quantityEnergy:dataEnergia.quantidadeInicial,
      unityTariffEnergy:dataEnergia.tarifaUnitaria,
      priceEnergy:dataEnergia.valor,
      amountIcms:dataICMS.quantidadeInicial,
      unityIcms:dataICMS.tarifaUnitaria,
      priceIcms: dataICMS.valor,
      amountOfEnergyInject:dataEjeatada.quantidadeInicial,
      unityTariffOfEnergyInject:dataEjeatada.tarifaUnitaria,
      priceOfEnergyInject:dataEjeatada.valor,
      amountGDI:dataGDI.quantidadeInicial,
      unityGDI:dataGDI.tarifaUnitaria,
      priceGDI:dataGDI.valor,
    
      
     })
     console.log("invoice@##############",invoce)

       this.invoceRepository.create(invoce)
    })
    

  }
}

