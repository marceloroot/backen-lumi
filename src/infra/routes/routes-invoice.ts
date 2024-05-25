import { Router } from 'express';
import { getAll, getById } from '../controller/invoice-controller';




const router = Router();

router.get('/api/invoice/fetchall',getAll);
router.get('/api/invoice/:id?',getById);



export default router;  
