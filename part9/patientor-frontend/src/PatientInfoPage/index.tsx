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
  const [{ selectedPatient }, dispatch] = useStateValue();

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
  }, []);

  const { name, gender, ssn, occupation } = selectedPatient[id] || {};

  return (
    <Container>
      <Header as="h2">
        {name} {gender === 'male' ? <Icon name="man" /> : <Icon name="woman" />}
      </Header>
      <p>ssn: {ssn}</p>
      <p>occupation: {occupation}</p>
    </Container>
  );
};

export default PatientInfo;
