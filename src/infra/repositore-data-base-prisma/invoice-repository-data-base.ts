import { PrismaClient } from "@prisma/client";
import { Invoice } from "../../domain/entity/invoice";
import { InvoiceRepository } from "../../domain/repository/invoice-repository";
import { InvoiceMapper } from "./mappers/invoice-mapper";
import { UserMapper } from "./mappers/user-mapper";
export class InvoiceRepositoryDataBase implements InvoiceRepository {
  constructor(private prismaClient: PrismaClient) {}

  async create(invoice: Invoice): Promise<Invoice> {
    const invoicePrismaCreate = await this.prismaClient.invoice.create({
      data: {
        userId: invoice.userId,
        installationNumber: invoice.installationNumber,
        monthReferring: invoice.monthReferring,
        expirationDate: invoice.expirationDate,
        amountToBePaid: invoice.amountToBePaid,
        publicContribution: invoice.publicContribution,
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
    return InvoiceMapper.invoceMapper(invoicePrismaCreate)
  }
  async findAllUser(userId?: string): Promise<Invoice[]> {
    const invoicesWithUser = await this.prismaClient.invoice.findMany({
      where: userId ? { userId } : {},
      include: {
        user: true,
      },
    });
  
    // Mapeia cada resultado para a entidade Invoice
    const invoices = invoicesWithUser.map(invoiceWithUser => {     
      const userData = invoiceWithUser.user ;
      // Mapeia os dados da fatura para a entidade Invoice
      const invoiceEntity = InvoiceMapper.toEntity(invoiceWithUser);
      // Se houver dados do usuário, mapeia-os para a entidade User e atribui à fatura
      if (userData) {
        const userEntity = UserMapper.invoceMapper(userData);
        invoiceEntity.user = userEntity;
      }
      return invoiceEntity;
    });
  
    return invoices;
  }
 async findAll(skip: number, take: number,userId?: string): Promise<Invoice[]> {
       const page = ((skip == 0) ? skip :  skip * take);
      const invoicePrisma  = await this.prismaClient.invoice.findMany({
        where: userId ? { userId } : {},
        take:take,
        skip:page,
      }
    )
      
      const invoces = invoicePrisma.map(InvoiceMapper.toEntity)
      return invoces;
  }

  async findExist(userId: string, installationNumber: string, monthReferring: string): Promise<Invoice[]> {
      const invocePrisma = await this.prismaClient.invoice.findMany({
        where:{
          userId: userId,
          installationNumber: installationNumber,
          monthReferring: monthReferring
        }
      })
      const invoice = invocePrisma.map(InvoiceMapper.invoceMapper)

      return invoice;
  }
}
