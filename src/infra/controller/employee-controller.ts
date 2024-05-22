import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { EmplpoyeetUseCaseFactory } from "../facotry/abstract-factory/list-employees-abstract-factory";
import { Employee } from '../../domain/entity/employee';


export const getAll = async (req: Request, res: Response): Promise<void> =>  {
    try{
      const page = parseInt(req.query.page as string) || 1;
      const size = parseInt(req.query.size as string) || 10;
      const filter = req.query.filter ? req.query.filter.toString() : '';
      const sortOrder =req.query.sortorder ? req.query.sortorder.toString() : 'asc';
      const listEmployeesFactory = EmplpoyeetUseCaseFactory.ListEmpolyeeAbstractFactory();
  
      const employees = await listEmployeesFactory.execute(page,size,filter,sortOrder);
      res.status(StatusCodes.OK).json(employees);
    } catch (error:any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: error.message
        });
    }
   
};

export const create = async (req: Request, res: Response):Promise<void> =>{
    try{
      const { name, role, department,date } = req.body;
      const dateFormated = new Date(date.toString());
      const id: string = uuid();
      const newEmployee = new Employee({ id,name, role, department,date: dateFormated});
      const createEmployeesFactory = EmplpoyeetUseCaseFactory.createEmpolyeeAbstractFactory();
      const employee = await createEmployeesFactory.execute(newEmployee);
      res.status(StatusCodes.OK).json(employee);
    }
    catch(error:any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: error.message
        });
    }
}

export const update = async (req: Request, res: Response):Promise<void> =>{
  try{
    const { id } = req.params; // Obtém o ID do parâmetro da URL
    const { name, role, department,date } = req.body;
    const dateFormated = new Date(date.toString());
    const newEmployee = new Employee({ id,name, role, department,date: dateFormated});
    const updateEmployeesFactory = EmplpoyeetUseCaseFactory.updateEmpolyeeAbstractFactory();
    const employee = await updateEmployeesFactory.execute(id,newEmployee);
    res.status(StatusCodes.OK).json(employee);
  }
  catch(error:any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message
      });
  }
}

export const getById = async (req: Request, res: Response): Promise<void> =>  {
  try{
    const { id } = req.params; // Obtém o ID do parâmetro da URL
    const listEmployeesFactory = EmplpoyeetUseCaseFactory.getEmpolyeeAbstractFactory();
    const employees = await listEmployeesFactory.execute(id);
    res.status(StatusCodes.OK).json(employees);
  } catch (error:any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message
      });
  }
 
};

export const deleted = async (req: Request, res: Response): Promise<void> =>  {
  try{
    const { id } = req.params; // Obtém o ID do parâmetro da URL
    const deleteEmployeesFactory = EmplpoyeetUseCaseFactory.deleteEmpolyeeAbstractFactory();
    await deleteEmployeesFactory.execute(id);
    res.status(StatusCodes.OK).json({message:"Deletado com Sucesso!"});
  } catch (error:any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message
      });
  }
 
};