import * as React from 'react';
import { List } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { Diagnosis } from '../types';

interface DiagnosesProps {
  diagnosisCodes: Array<Diagnosis['code']>;
}

const Diagnoses: React.FunctionComponent<DiagnosesProps> = ({
  diagnosisCodes,
}) => {
  const [{ diagnoses }] = useStateValue();

  const relevantDiagnoses = diagnoses?.filter(({ code }) =>
    diagnosisCodes?.includes(code)
  );

  return (
    <List>
      {relevantDiagnoses?.map(({ code, name }) => (
        <List.Item key={code}>
          {code} {name}
        </List.Item>
      ))}
    </List>
  );
};

export default Diagnoses;
