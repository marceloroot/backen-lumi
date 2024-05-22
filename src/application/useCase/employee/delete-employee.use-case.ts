import { EmployeeRepository } from "../../../domain/repository/employee-repository";

export class DeleteEmployeesUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute(id:string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
