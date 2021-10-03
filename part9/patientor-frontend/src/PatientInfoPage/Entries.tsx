import * as React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

import {
  HospitalEntry as HospitalEntryType,
  OccupationalHealthCareEntry as OccupationalHealthCareEntryType,
  HealthCheckEntry as HealthCheckEntryType,
  HealthCheckRating,
} from '../types';
import Diagnoses from './Diagnoses';

interface HospitalEntryProps {
  entry: HospitalEntryType;
}

export const HospitalEntry: React.FunctionComponent<HospitalEntryProps> = ({
  entry,
}) => {
  const { date, description, diagnosisCodes } = entry;

  return (
    <Segment>
      <Header size="medium">
        {date} <Icon name="hospital" />
      </Header>
      <em>{description}</em>
      <Diagnoses diagnosisCodes={diagnosisCodes} />
    </Segment>
  );
};

interface OccupationalHealthCareEntryProps {
  entry: OccupationalHealthCareEntryType;
}

export const OccupationalHealthCareEntry: React.FunctionComponent<OccupationalHealthCareEntryProps> =
  ({ entry }) => {
    const { date, description, diagnosisCodes, employerName } = entry;

    console.log(diagnosisCodes);

    return (
      <Segment>
        <Header size="medium">
          {date} <Icon name="stethoscope" /> {employerName}
        </Header>
        <em>{description}</em>
        {!!diagnosisCodes && <Diagnoses diagnosisCodes={diagnosisCodes} />}
      </Segment>
    );
  };

interface HealthCheckEntryProps {
  entry: HealthCheckEntryType;
}

export const HealthCheckEntry: React.FunctionComponent<HealthCheckEntryProps> =
  ({ entry }) => {
    const { date, description, diagnosisCodes, healthCheckRating } = entry;

    const getRatingColor = () => {
      switch (healthCheckRating) {
        case HealthCheckRating.Healthy:
          return 'green';
        case HealthCheckRating.LowRisk:
          return 'yellow';
        case HealthCheckRating.HighRisk:
          return 'orange';
        case HealthCheckRating.CriticalRisk:
          return 'red';

        default:
          throw new Error(
            `Unknown rating: ${JSON.stringify(healthCheckRating)}`
          );
      }
    };

    return (
      <Segment>
        <Header size="medium">
          {date} <Icon name="stethoscope" />
        </Header>
        <em>{description}</em>
        {!!diagnosisCodes && <Diagnoses diagnosisCodes={diagnosisCodes} />}
        <div>
          <Icon name="heart" size="small" color={getRatingColor()} />
        </div>
      </Segment>
    );
  };
