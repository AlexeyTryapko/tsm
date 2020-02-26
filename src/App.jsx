import React from 'react';
import './style.css';
import { chart, nodes } from './configs/mock';
import Workspace from './containers/Workspace';
import NodesSidebar from './containers/NodesSidebar';

const App = () => {
    return (
        <div className="page-content">
            <NodesSidebar nodes={nodes} />
            <Workspace chart={chart} />
        </div>
    );
};

export default App;
