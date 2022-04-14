/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

export const router = Router();

import { cmd } from './cmd';
router.post('/cmd', cmd);
