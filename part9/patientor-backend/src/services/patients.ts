// @types/uuid and uuid versions must match :https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42634#issuecomment-677426309
import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';

import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getEntry = (id: string): PatientEntry | undefined => {
  return patients.find((p) => p.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newEntry: NewPatientEntry): PatientEntry => {
  const id: string = uuidv4();

  const newPatientEntry = {
    id,
    ...newEntry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getEntry, getNonSensitiveEntries, addPatient };
