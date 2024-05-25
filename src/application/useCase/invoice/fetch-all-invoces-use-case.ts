import { Invoice } from "../../../domain/entity/invoice";

import { InvoiceRepository } from "../../../domain/repository/invoice-repository";

export class FetchAllInvoicesUseCase {
  constructor(
    private invoiceRepository: InvoiceRepository,
  ) {}

  async execute(skip: number, take: number,userId?:string): Promise<Invoice[]> {
      const invoices = await this.invoiceRepository.findAll(skip,take,userId,);
      return invoices;
  }
}
