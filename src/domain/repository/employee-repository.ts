import { Employee } from "../entity/employee";

//poderia usar o I do SOLID Interfce Segragation
export interface EmployeeRepository {
  findAll(page: number, pageSize: number,filter:string,sortorder:string): Promise<Employee[]>;
  findById(id: string): Promise<Employee  | undefined>;
  create(employee:Employee): Promise<Employee>;
  update(id:string,employee:Employee): Promise<Employee>;
  delete(id: string): Promise<void | undefined>;
}
