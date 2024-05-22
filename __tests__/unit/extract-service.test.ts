
import { ProcessPDFService} from '../../src/application/services/extract'

describe('Testa a camada service', () => {



test("Deveria buscar todos os dados dos pdfs na pasta arquivos tradzido diretamente da camada de serviço ", async function(){
  const porocessService = new  ProcessPDFService();
  const dataService = await porocessService.execute()
   expect(dataService.length >0).toBe(true);
});



})


