import { Checkbox, Collapse, CollapsePanelProps, Tabs, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

const PanelAssignment01: React.FC<CollapsePanelProps> = props => {
  const [solutionEnabled, setSolutionEnabled] = useLocalStorage('solutionEnabled_01', false);

  return (
    <Panel {...props} extra={<Checkbox disabled>afgerond</Checkbox>}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Opdracht',
            key: '1',
            children: (
              <>
                <Paragraph>beschrijf de opdracht</Paragraph>
                <Checkbox
                  checked={solutionEnabled}
                  onChange={(e: CheckboxChangeEvent) => setSolutionEnabled(e.target.checked)}
                >
                  toon de oplossing
                </Checkbox>
              </>
            ),
          },
          {
            label: 'Oplossing',
            key: '2',
            disabled: !solutionEnabled,
            children: (
              <Paragraph>
                <Text code>Hier staat de oplossing</Text>
              </Paragraph>
            ),
          },
        ]}
      />
    </Panel>
  );
};

export default PanelAssignment01;
