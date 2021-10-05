import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  NumberField,
  DiagnosisSelection,
  EntryTypeSelection,
} from '../AddPatientModal/FormField';
import { NewEntry, EntryType, HealthCheckRating } from '../types';
import { useStateValue } from '../state';

/*
 * use type Entry, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<NewEntry, 'id' | 'type'>;

interface Props {
  onSubmit: (newEntry: NewEntry) => Promise<void>;
  onCancel: () => void;
}

const renderRelevantOptionalFields = (type: EntryType) => {
  switch (type) {
    case EntryType.Hospital:
      return (
        <>
          <Field
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria"
            placeholder="Discharge criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );

    case EntryType.HealthCheck:
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );

    case EntryType.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Sick leave start date"
            placeholder="Enter a valid date"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick leave end date"
            placeholder="Enter a valid date"
            name="sickLeave.endDate"
            component={TextField}
          />
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
        </>
      );

    default:
      throw new Error(`Unknown entry type: ${JSON.stringify(type)}`);
  }
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: EntryType.Hospital,
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
        discharge: { date: '', criteria: '' },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';

        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        console.log(values);

        return (
          <Form className="form ui">
            <EntryTypeSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              entryTypes={Object.values(EntryType)}
            />

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            {renderRelevantOptionalFields(values.type)}

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
