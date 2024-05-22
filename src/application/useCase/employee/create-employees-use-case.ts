import { Employee } from "../../../domain/entity/employee";
import { EmployeeRepository } from "../../../domain/repository/employee-repository";
import { EmployeesDTOList } from "./DTO/employees-dto-list";

export class CreateEmployeesUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute(employee:Employee): Promise<EmployeesDTOList> {
    const employeeRepository = await this.employeeRepository.create(employee);
    return {
        id:employeeRepository.id,
        date:employeeRepository.date,
        department:employeeRepository.department,
        name:employeeRepository.name,
        role:employeeRepository.role,
    }
   
  }
}
