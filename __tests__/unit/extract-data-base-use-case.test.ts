

import { PrismaClient } from "@prisma/client";
import {ExtractDataFileUseCaseFactory} from '../../src/infra/facotry/abstract-factory/invoice/extract-data-file-use-case-factory'

describe('Testa a camada Use Case extract', () => {



test("Deveria salvar no banco de dados os invoices e usuarios referente ", async function(){
    const primsa =  new PrismaClient();
    const extractAbstractFacture = ExtractDataFileUseCaseFactory.ExtractDataFileAbstractFactory(primsa);
    extractAbstractFacture.execute();
    
});



})


