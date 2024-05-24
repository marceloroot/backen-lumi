import { Router } from 'express';
import { getById } from '../controller/invoice-controller';




const router = Router();

router.get('/api/invoice/:id?',getById);


export default router;  
