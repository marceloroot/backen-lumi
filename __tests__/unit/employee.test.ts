import { Employee } from "../../src/domain/entity/employee";
import { EmplpoyeetUseCaseFactory } from "../../src/infra/facotry/abstract-factory/list-employees-abstract-factory";

import { connectToMongoDB, disconnectFromMongoDB } from '../../src/infra/repositoreDataBase/connect'; // Corrigido o caminho do import

let id:string ="";
describe('Employee Test', () => {

beforeAll(() => {
  id = "66476d7c51eda272e8ca1017"
  connectToMongoDB()
  .then(() => {

  })
  .catch((error: any) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    // Se houver erro na conexão com o MongoDB, talvez você queira encerrar o aplicativo aqui
    process.exit(1); // Encerra o processo com código de erro
  });
 

});
afterAll(async () => {
  try {
    await disconnectFromMongoDB();
  } catch (error) {
    console.error('Erro ao desconectar do MongoDB:', error);
  }
});

test("Deveria buscar todos um employee no repositorio", async function(){
  const listEmployeesFactory = EmplpoyeetUseCaseFactory.ListEmpolyeeAbstractFactory();
    const employees = await listEmployeesFactory.execute(1,5,'','asc');
   expect(employees.length).toBeGreaterThan(0);
});

test("Deveria criar um employee no repositorio", async function(){
  const employees = new Employee ({
    date: new Date(),
    department: 'Administrativo',
    id:"939393939",
    name:"Pedro Santos",
    role:"Administrador",
  })
  const createEmployeesFactory = EmplpoyeetUseCaseFactory.createEmpolyeeAbstractFactory();
    const employee = await createEmployeesFactory.execute(employees);
   expect(employee.name).toBe("Pedro Santos")
});
test("Deveria atualizar um employee no repositorio pelo id", async function(){
  const id = "6647b571f106870002beccfa";
  const employees = new Employee ({
    date: new Date(),
    department: 'Administrativo',
    id:"6647b571f106870002beccfa",
    name:"Pedro Paulo",
    role:"Administrador",
  });
  const updateEmployeesFactory = EmplpoyeetUseCaseFactory.updateEmpolyeeAbstractFactory();
    const employee = await updateEmployeesFactory.execute(id,employees);
   expect(employee.name).toBe("Pedro Paulo")
});

test("Deveria buscar um employee no repositorio pelo id", async function(){
  
   const listEmployeesFactory = EmplpoyeetUseCaseFactory.getEmpolyeeAbstractFactory();
   const employees = await listEmployeesFactory.execute(id);
   expect(employees?.id).toBe("66476d7c51eda272e8ca1017");
});

test("Deveria delete um employee no repositorio pelo id", async function(){
    const id = "6647c742184b71e014520301";
  
    const deleteEmployeesFactory = EmplpoyeetUseCaseFactory.deleteEmpolyeeAbstractFactory();
    await deleteEmployeesFactory.execute(id);
      // Verificar se o funcionário foi excluído
    const getEmployeesFactory = EmplpoyeetUseCaseFactory.getEmpolyeeAbstractFactory();
    const employeeAfterDelete = await getEmployeesFactory.execute(id);
    expect(employeeAfterDelete).toBeUndefined();
});

})


