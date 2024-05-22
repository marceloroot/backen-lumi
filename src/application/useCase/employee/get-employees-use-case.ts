import { EmployeeRepository } from "../../../domain/repository/employee-repository";
import { EmployeesDTOList } from "./DTO/employees-dto-list";

export class GetEmployeesUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute(id:string): Promise<EmployeesDTOList | undefined> {
    const employeeRepository = await this.employeeRepository.findById(id);
    if(!employeeRepository) return undefined;
    return {
        id:employeeRepository.id,
        date:employeeRepository.date,
        department:employeeRepository.department,
        name:employeeRepository.name,
        role:employeeRepository.role,
    }
  }
}
