import { Router } from 'express';
import { getAll,create, getById, update,deleted } from '../controller/employee-controller';
import { validate } from '../middleware/validation-middleware';
import { employeeSchema } from '../validation/employee-validation';

import { ExtractDataFileUseCaseFactory } from '../facotry/abstract-factory/invoice/extract-data-file-use-case-factory';
import { connectionPrisma } from '../prisma/prisma';

const router = Router();
router.get('/', async (_, res) => {
 const extractAbstractFacture = ExtractDataFileUseCaseFactory.ExtractDataFileAbstractFactory(connectionPrisma);
 extractAbstractFacture.execute();
  res.status(200).json({msg:'cadastrodo'})
});
router.get('/api/employees/:id',getById);
router.delete('/api/employees/:id',deleted);
router.get('/api/employees',getAll);
router.put('/api/employees/:id', validate(employeeSchema),update);
router.post('/api/employees', validate(employeeSchema),create);

export default router;  


//ha fazer verificar erro na hora de salvar no extract
//salvar o src com onome do arquivo se ja exisitr o nome ele so atualiza se não salva
//refatorar os nomes.
