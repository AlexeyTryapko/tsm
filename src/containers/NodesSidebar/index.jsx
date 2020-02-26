import * as React from 'react';
import SidebarItem from '../../components/SidebarItem';

const NodesSidebar = ({ nodes = [] }) => (
    <div className="sidebar">
        <div className="sidebar-title">
            Drag and drop these items onto the workspace.
        </div>
        {nodes.map((node, i) => (
            <SidebarItem key={i} {...node} />
        ))}
    </div>
);

export default NodesSidebar;
