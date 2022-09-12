import { Checkbox, Collapse, CollapsePanelProps, Tabs, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useState } from 'react';

const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

const PanelAssignment02: React.FC<CollapsePanelProps> = props => {
  const [solutionEnabled, setSolutionEnabled] = useState(false);

  return (
    <Panel {...props}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Opdracht',
            key: '1',
            children: (
              <>
                <Paragraph>beschrijf de opdracht</Paragraph>
                <Checkbox onChange={(e: CheckboxChangeEvent) => setSolutionEnabled(e.target.checked)}>
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

export default PanelAssignment02;
