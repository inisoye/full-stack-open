import express from 'express';
import patientsServices from '../services/patients';
import createNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const { id }: { id: string } = req.params;

  res.send(patientsServices.getEntry(id));
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
