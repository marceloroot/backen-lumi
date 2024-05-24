import { Invoice } from "../entity/invoice";

export interface InvoiceRepository {
  create(invoice:Invoice): Promise<Invoice>;
  findAllUser(userId?:string): Promise<Invoice[]>;

}
