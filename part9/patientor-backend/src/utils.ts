import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringProperty = (
  propertyValue: unknown,
  propertyName: string
): string => {
  if (!propertyValue || !isString(propertyValue)) {
    throw new Error(`Incorrect or missing ${propertyName}`);
  }

  return propertyValue;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const createNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseStringProperty(name, 'name'),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseStringProperty(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringProperty(occupation, 'occupation'),
  };

  return newEntry;
};

export default createNewPatientEntry;
