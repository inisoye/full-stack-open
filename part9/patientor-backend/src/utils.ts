import {
  Diagnosis,
  NewPatient,
  Gender,
  Entry,
  EntryType,
  NewEntry,
  BaseEntry,
  Discharge,
  SickLeave,
  HealthCheckRating,
} from './types';

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

//! Entry stuff begins
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is Entry => {
  return Object.values(EntryType).includes(param.type);
};

const parseEntryType = (entry: unknown): Entry => {
  if (!entry || !isEntryType(entry)) {
    throw new Error('Incorrect or missing entry type: ' + entry);
  }

  return entry;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Incorrect entries: ' + entries);
  }

  return entries.map((entry) => parseEntryType(entry));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date ' + date);
  }

  return date;
};

// Diagnostic codes are optional
const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis['code']> | undefined => {
  if (!diagnosisCodes) {
    return;
  }

  if (
    !diagnosisCodes ||
    !Array.isArray(diagnosisCodes) ||
    !diagnosisCodes.every((c) => isString(c))
  ) {
    throw new Error('Incorrect or missing diagnosis codes ' + diagnosisCodes);
  }

  return diagnosisCodes as Array<Diagnosis['code']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (params: any): boolean => {
  return (
    Object.keys(params).length !== 0 &&
    !!params.date &&
    !!params.criteria &&
    isDate(params.date) &&
    isString(params.criteria)
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge details`);
  }

  return discharge as Discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (params: any): boolean => {
  return (
    Object.keys(params).length !== 0 &&
    !!params.startDate &&
    !!params.endDate &&
    isDate(params.startDate) &&
    isDate(params.endDate)
  );
};

// Sick leave is optional
const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return;
  }

  if (!isSickLeave(sickLeave)) {
    throw new Error(`Incorrect leave details`);
  }

  return sickLeave as SickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): boolean => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(`Incorrect or missing healthcheck rating`);
  }

  return healthCheckRating as HealthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyNewEntry = (newEntry: any): NewEntry => {
  const parsedEntryType = parseEntryType(newEntry);

  // Is entry type valid
  if (!parsedEntryType) {
    throw new Error('Unknown entry type: ' + newEntry.type);
  }

  const newBaseEntry: Omit<BaseEntry, 'id'> = {
    date: parseDate(newEntry.date),
    description: parseStringProperty(newEntry.description, 'entry description'),
    specialist: parseStringProperty(newEntry.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(newEntry.diagnosisCodes),
  };

  switch (newEntry.type) {
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        type: EntryType.Hospital,
        discharge: parseDischarge(newEntry.discharge),
      };

    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        type: EntryType.OccupationalHealthcare,
        employerName: parseStringProperty(
          newEntry.employerName,
          'employer name'
        ),
        sickLeave: parseSickLeave(newEntry.sickLeave),
      };

    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(newEntry.healthCheckRating),
      };

    default:
      throw new Error(`Unknown entry type: ${JSON.stringify(newEntry)}`);
  }
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

// Parses new patient details to ensure all fields are of right type
const verifyNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringProperty(name, 'name'),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseStringProperty(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringProperty(occupation, 'occupation'),
    entries: parseEntries(entries),
  };

  return newPatient;
};

export default verifyNewPatient;
