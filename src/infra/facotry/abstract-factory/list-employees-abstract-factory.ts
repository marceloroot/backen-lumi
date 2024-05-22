import { CreateEmployeesUseCase } from "../../../application/useCase/employee/create-employees-use-case";
import { DeleteEmployeesUseCase } from "../../../application/useCase/employee/delete-employee.use-case";
import { GetEmployeesUseCase } from "../../../application/useCase/employee/get-employees-use-case";
import { ListEmployeesUseCase } from "../../../application/useCase/employee/list-employees-use-case";
import { UpdateEmployeesUseCase } from "../../../application/useCase/employee/update-employee-use-case";
import { EmployeeRepositoryDataBase } from "../../repositoreDataBase/repositore-data-base";


export class EmplpoyeetUseCaseFactory {
  
  static ListEmpolyeeAbstractFactory(): ListEmployeesUseCase {
    const employeeRepositoreDataBase = new EmployeeRepositoryDataBase();
    return new ListEmployeesUseCase(employeeRepositoreDataBase);
  }

  static createEmpolyeeAbstractFactory(): CreateEmployeesUseCase {
    const employeeRepositoreDataBase = new EmployeeRepositoryDataBase();
    return new CreateEmployeesUseCase(employeeRepositoreDataBase);
  }

  static getEmpolyeeAbstractFactory(): GetEmployeesUseCase {
    const employeeRepositoreDataBase = new EmployeeRepositoryDataBase();
    return new GetEmployeesUseCase(employeeRepositoreDataBase);
  }

  static updateEmpolyeeAbstractFactory(): UpdateEmployeesUseCase {
    const employeeRepositoreDataBase = new EmployeeRepositoryDataBase();
    return new UpdateEmployeesUseCase(employeeRepositoreDataBase);
  }

  static deleteEmpolyeeAbstractFactory(): DeleteEmployeesUseCase {
    const employeeRepositoreDataBase = new EmployeeRepositoryDataBase();
    return new DeleteEmployeesUseCase(employeeRepositoreDataBase);
  }


 
}
