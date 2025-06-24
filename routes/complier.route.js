import express from 'express';
import { complier , creditBalance } from '../controllers/complier.controller.js';

const router = express.Router();

router.post('/', complier)
router.post('/criedtBalance', creditBalance)

export default router;