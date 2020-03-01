import * as React from 'react';
import SidebarItem from '../../components/SidebarItem';
import { Paragraph, Pane } from 'evergreen-ui';

const NodesSidebar = ({ nodes = [] }) => (
    <div className="sidebar">
        <Pane padding={20} marginBottom={20}>
            <Paragraph>Drag and drop these items onto the workspace.</Paragraph>
        </Pane>
        {nodes.map((node, i) => (
            <SidebarItem key={i} {...node} />
        ))}
    </div>
);

export default NodesSidebar;
