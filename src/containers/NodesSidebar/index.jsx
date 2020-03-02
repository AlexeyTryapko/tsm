import * as React from 'react';
import SidebarItem from '../../components/SidebarItem';
import { Paragraph, Pane, IconButton } from 'evergreen-ui';

const NodesSidebar = ({ nodes = [], handleRunClick }) => (
    <div className="sidebar">
        <Pane paddingX={20} paddingY={10}>
            <IconButton icon="play" intent="success" onClick={handleRunClick} />
        </Pane>
        <Pane padding={20} marginBottom={20}>
            <Paragraph>Drag and drop these items onto the workspace.</Paragraph>
        </Pane>
        {nodes.map((node, i) => (
            <SidebarItem key={i} {...node} />
        ))}
    </div>
);

export default NodesSidebar;
