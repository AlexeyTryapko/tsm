import * as React from 'react';
import { FlowChart } from '@mrblenny/react-flow-chart';
import Node from '../../components/Node';

export const Schema = ({ chart, actions }) => (
    <div className="content">
        <FlowChart
            chart={chart}
            callbacks={actions}
            Components={{
                NodeInner: Node,
            }}
            config={{
                validateLink: ({ fromPortId, toPortId }) =>
                    fromPortId === 'out' &&
                    toPortId === 'in' &&
                    fromPortId !== toPortId,
            }}
        />
    </div>
);

export default Schema;
