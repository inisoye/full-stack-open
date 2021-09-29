import express from 'express';
import patients from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patients.getNonSensitiveEntries());
});

export default router;
