import { Invoice } from "../entity/invoice";

export interface InvoiceRepository {
  create(invoice:Invoice): Promise<Invoice>;
  findAllUser(userId?:string): Promise<Invoice[]>;
  findAll(skip: number, take: number, userId?:string): Promise<Invoice[]>;
  findExist(userId:string,installationNumber:string,monthReferring:string): Promise<Invoice[]>;

}
