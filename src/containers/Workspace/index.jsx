import * as React from 'react';
import { FlowChart } from '@mrblenny/react-flow-chart';

export const Workspace = ({ chart, actions }) => (
    <div className="content">
        <FlowChart chart={chart} callbacks={actions} />
    </div>
);

export default Workspace;
