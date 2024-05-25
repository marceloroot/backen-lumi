import { Router } from 'express';
import { getByAll } from '../controller/user-controller';



const router = Router();

router.get('/api/user',getByAll);


export default router;  
