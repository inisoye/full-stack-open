// @types/uuid and uuid versions must match :https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42634#issuecomment-677426309
import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  NewEntry,
} from '../types';

export const getPatients = (): Patient[] => {
  return patients;
};

export const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error('Patient not selected');
  }

  return patient;
};

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (newPatient: NewPatient): Patient => {
  const id: string = uuidv4();

  const newPatientWithId = {
    id,
    ...newPatient,
  };

  patients.push(newPatientWithId);
  return newPatientWithId;
};

export const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const id: string = uuidv4();

  const newEntryWithId: Entry = {
    id,
    ...newEntry,
  };

  patient?.entries.push(newEntryWithId);
  return patient;
};
