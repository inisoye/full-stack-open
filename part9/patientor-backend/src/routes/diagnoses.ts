import express from 'express';
import diagnoses from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoses.getEntries());
});

export default router;
