import { NewPatientEntry, Gender, Entry, EntryType } from './types';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is Entry => {
  return Object.values(EntryType).includes(param.type);
};

const parseEntry = (entry: unknown): Entry => {
  if (!entry || !isEntryType(entry)) {
    throw new Error('Incorrect or missing entry: ' + entry);
  }
  return entry;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Incorrect entries: ' + entries);
  }
  return entries.map((entry) => parseEntry(entry));
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const createNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseStringProperty(name, 'name'),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseStringProperty(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringProperty(occupation, 'occupation'),
    entries: parseEntries(entries),
  };

  return newEntry;
};

export default createNewPatientEntry;
