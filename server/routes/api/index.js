import { Router } from 'express';

import * as controllers from './controller';

const router = Router();

router.post('/moved', controllers.addMove);

export default router;
