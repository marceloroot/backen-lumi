import { Router } from 'express';
import { getAll,create, getById, update,deleted } from '../controller/employee-controller';
import { validate } from '../middleware/validation-middleware';
const multer  = require('multer')
import { employeeSchema } from '../validation/employee-validation';

import { ExtractDataFileUseCaseFactory } from '../facotry/abstract-factory/invoice/extract-data-file-use-case-factory';
import { connectionPrisma } from '../prisma/prisma';
// Multer Configuração
const storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
    cb(null, 'arquivos/');
  },
  filename: function (req:any, file:any, cb:any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf');
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Permitidos somente arquivos pdf'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});





const router = Router();
router.get('/', async (_, res) => {
 const extractAbstractFacture = ExtractDataFileUseCaseFactory.ExtractDataFileAbstractFactory(connectionPrisma);
 extractAbstractFacture.execute();
  res.status(200).json({msg:'cadastrodo'})
});

router.post('/upload', upload.single('file'), (req:any, res:any) => {
  if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({ message: 'File uploaded successfully', filename: req.file.filename })
})

router.get('/api/employees/:id',getById);
router.delete('/api/employees/:id',deleted);
router.get('/api/employees',getAll);
router.put('/api/employees/:id', validate(employeeSchema),update);
router.post('/api/employees', validate(employeeSchema),create);

export default router;  


//ha fazer verificar erro na hora de salvar no extract
//salvar o src com onome do arquivo se ja exisitr o nome ele so atualiza se não salva
//refatorar os nomes.
