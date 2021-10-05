import * as React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Container, Header, Icon, Button } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient, EntryType, NewEntry } from '../types';
import { setSinglePatient } from '../state/reducer';
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthCareEntry,
} from './Entries';
import AddEntryModal from '../AddEntryModal';

const PatientInfo: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [{ selectedPatient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (newEntry: NewEntry) => {
    try {
      const { data: updatedPatientFromApi } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry
      );

      dispatch(setSinglePatient(updatedPatientFromApi));
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  const { name, gender, ssn, occupation, entries } = selectedPatient[id] || {};

  return (
    <Container>
      <Header as="h2">
        {name} {gender === 'male' ? <Icon name="man" /> : <Icon name="woman" />}
      </Header>
      <p>ssn: {ssn}</p>
      <p>occupation: {occupation}</p>

      <Header as="h3">entries</Header>

      {entries?.map((entry) => {
        switch (entry.type) {
          case EntryType.Hospital:
            return <HospitalEntry key={entry.id} entry={entry} />;

          case EntryType.OccupationalHealthcare:
            return <OccupationalHealthCareEntry key={entry.id} entry={entry} />;

          case EntryType.HealthCheck:
            return <HealthCheckEntry key={entry.id} entry={entry} />;

          default:
            throw new Error(`Unknown entry type: ${JSON.stringify(entry)}`);
        }
      })}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New entry</Button>
    </Container>
  );
};

export default PatientInfo;
