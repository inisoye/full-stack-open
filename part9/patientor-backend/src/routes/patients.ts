import express from 'express';
import {
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry,
} from '../services/patients';
import verifyNewPatient, { verifyNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const { id }: { id: string } = req.params;

  res.send(getPatient(id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = verifyNewPatient(req.body);
    const addedPatient = addPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const { id }: { id: string } = req.params;
    const patient = getPatient(id);

    const newEntry = verifyNewEntry(req.body);

    if (patient && newEntry) {
      const addedEntry = addEntry(patient, newEntry);
      res.json(addedEntry);
    }
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
