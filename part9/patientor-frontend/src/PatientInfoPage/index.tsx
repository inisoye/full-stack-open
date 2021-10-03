import * as React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Container, Header, Icon } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';
import { setSinglePatient } from '../state/reducer';

const PatientInfo: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [{ selectedPatient, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setSinglePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  const { name, gender, ssn, occupation, entries } = selectedPatient[id] || {};

  return (
    <Container>
      <Header as="h2">
        {name} {gender === 'male' ? <Icon name="man" /> : <Icon name="woman" />}
      </Header>
      <p>ssn: {ssn}</p>
      <p>occupation: {occupation}</p>

      <Header as="h3">entries</Header>

      {entries?.map(({ id, date, description, diagnosisCodes }) => {
        const relevantDiagnoses = diagnoses?.filter(({ code }) =>
          diagnosisCodes?.includes(code)
        );

        return (
          <div key={id}>
            <p>
              {date} <em>{description}</em>
            </p>

            <ul>
              {relevantDiagnoses?.map(({ code, name }) => (
                <li key={code}>
                  {code} {name}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </Container>
  );
};

export default PatientInfo;
