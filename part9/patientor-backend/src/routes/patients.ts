import express from 'express';
import patientsServices from '../services/patients';
import createNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = createNewPatientEntry(req.body);
    const addedEntry = patientsServices.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
