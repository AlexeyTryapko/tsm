import React from 'react';
import { FlowChartWithState } from '@mrblenny/react-flow-chart';

const App = ({ chart = {} }) => (
    <div className="content">
        <FlowChartWithState initialValue={chart} />
    </div>
);

export default App;
