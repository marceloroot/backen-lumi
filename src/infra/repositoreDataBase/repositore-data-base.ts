import { Employee } from "../../domain/entity/employee";
import { EmployeeRepository } from "../../domain/repository/employee-repository";
import EmployeeModel, { EmployeeInterface } from "./models/employee-model";

export class EmployeeRepositoryDataBase implements EmployeeRepository {
  constructor() {}
  async findAll(page: number, pageSize: number,filter:string,sortorder: string): Promise<Employee[]> {
    const skip = (page - 1) * pageSize;
    const sortOrder = sortorder === 'desc' ? -1 : 1 ; // Ordem de ordenação (1 para ascendente, -1 para descendente)
    const employeesModel = await EmployeeModel.find({ 
      name: new RegExp(filter, 'i') // Filtra por nome (insensível a maiúsculas/minúsculas)
    })
    .skip(skip) // Pula os documentos necessários para a página atual
    .limit(pageSize) // Limita o número de documentos retornados
    .sort({ name: sortOrder});
  
    const employees: Employee[] = employeesModel.map((data: EmployeeInterface) => {
      return new Employee({
        id: data.id,
        name: data.name,
        date: data.date,
        department: data.department,
        role: data.role
      });
    });
  
    return employees;
  }
  async findById(id: string): Promise<Employee | undefined> {
    const employeeModel = await EmployeeModel.findById(id);

    if (!employeeModel) {
      return undefined
    }
    return new Employee({
      id: employeeModel.id, // Adiciona o ID
      date: employeeModel.date,
      department: employeeModel.department,
      name: employeeModel.name,
      role: employeeModel.role,
    });
    
  }
  async create(employee: Employee): Promise<Employee> {
    const newEmployee = new EmployeeModel({
      name: employee.name,
      role:employee.role,
      department: employee.department,
      date: employee.date,
    });
    const savedEmployee = await newEmployee.save();
    return  new Employee({
      date: savedEmployee.date,
      department: savedEmployee.department,
      id: employee.id,
      name: employee.name,
      role: employee.role
    })
  }
  async update(id: string,employee: Employee): Promise<Employee> {
    const employeeToUpdate = await EmployeeModel.findById(id);
    if (!employeeToUpdate) {
      throw new Error('Funcionário não encontrado');
    }
    employeeToUpdate.name = employee.name;
    employeeToUpdate.role = employee.role;
    employeeToUpdate.department = employee.department;
    employeeToUpdate.date = employee.date;

    const updateEmployee = await employeeToUpdate.save();
    return  new Employee({
      date: updateEmployee.date,
      department: updateEmployee.department,
      id: updateEmployee.id,
      name: updateEmployee.name,
      role: updateEmployee.role
    })
  }
  async delete(id: string): Promise<void | undefined> {
    const employeeToDelete = await EmployeeModel.findById(id);
    if (!employeeToDelete) return
    
    await employeeToDelete.deleteOne();
  }
  
}

