import { Router } from 'express';
const multer  = require('multer')
import { ExtractDataFileUseCaseFactory } from '../facotry/abstract-factory/invoice/extract-data-file-use-case-factory';
import { connectionPrisma } from '../prisma/prisma';
import { extract, upLoad } from '../controller/upload-controller';
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


router.get('/', extract)


router.post('/upload', upload.single('file'), upLoad)


export default router;  


