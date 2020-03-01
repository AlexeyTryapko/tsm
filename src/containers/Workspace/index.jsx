import * as React from 'react';
import { FlowChart } from '@mrblenny/react-flow-chart';
import Node from '../../components/Node';

export const Workspace = ({ chart, actions }) => (
    <div className="content">
        <FlowChart
            chart={chart}
            callbacks={actions}
            Components={{
                NodeInner: Node,
            }}
        />
    </div>
);

export default Workspace;
