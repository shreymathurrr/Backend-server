import express from 'express';
import { ping, submit, read } from '../controllers/submissionController';

const router = express.Router();

router.get('/ping', ping);
router.post('/submit', submit);
router.get('/read', read);

export default router;
