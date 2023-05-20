import { Button, Checkbox, Collapse, CollapsePanelProps, Divider, Tabs, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

const PanelAssignment01: React.FC<
  CollapsePanelProps & {
    setActiveKey: (value: string | string[] | ((val: string | string[]) => string | string[])) => void;
  }
> = props => {
  const [solutionEnabled, setSolutionEnabled] = useLocalStorage('workshop:solutionEnabled:02', false);
  const [finished, setFinished] = useLocalStorage('workshop:assignment:02', false);

  const onClick = () => {
    // e.stopPropagation();
    setFinished(true);
    props.setActiveKey('assignment:03');
  };

  return (
    <Panel
      {...props}
      extra={
        <Checkbox checked={finished} disabled>
          completed
        </Checkbox>
      }
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Assignment',
            key: '1',
            children: (
              <>
                <Paragraph></Paragraph>

                <Paragraph>This assignment is completed when</Paragraph>

                <Checkbox
                  checked={solutionEnabled}
                  onChange={(e: CheckboxChangeEvent) => setSolutionEnabled(e.target.checked)}
                >
                  show the solution
                </Checkbox>
                <Divider plain />
                <Button onClick={onClick} size="small" shape="round" type="primary">
                  Next
                </Button>
              </>
            ),
          },
          {
            label: 'More info',
            key: '2',
            disabled: true,
            children: (
              <>
                <Paragraph>
                  <Text strong>More info</Text>
                </Paragraph>
              </>
            ),
          },
          {
            label: 'Solution',
            key: '3',
            disabled: !solutionEnabled,
            children: (
              <>
                <SyntaxHighlighter
                  customStyle={{ border: '1px lightgrey solid', fontSize: '12px' }}
                  lineNumberStyle={{ color: 'black', opacity: '0.4' }}
                  language="typescript"
                  showLineNumbers
                  style={docco}
                >
                  {solution.trim()}
                </SyntaxHighlighter>
                <Paragraph />
                <Divider plain />
                <Button onClick={onClick} size="small" shape="round" type="primary">
                  Next
                </Button>
              </>
            ),
          },
        ]}
      />
    </Panel>
  );
};

const solution = `

`;

export default PanelAssignment01;
