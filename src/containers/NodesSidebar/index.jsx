import React, { useState } from 'react';
import SidebarItem from '../../components/SidebarItem';
import { Paragraph, Pane, IconButton, SelectMenu, Button } from 'evergreen-ui';

const NodesSidebar = ({
    nodes = [],
    handleRunClick,
    handleSettingsCLick,
    handleFileUpload,
    hrefForDownload,
    workspaceList = [],
    selectWorkspace,
    workspaceTitle,
    workspaceId,
}) => {
    const fileInput = React.createRef();
    return (
        <div className="sidebar">
            <SelectMenu
                marginX={20}
                marginY={10}
                title="Select name"
                options={workspaceList}
                selected={workspaceId}
                onSelect={item => selectWorkspace(item.value)}
            >
                <Button>{workspaceTitle}</Button>
            </SelectMenu>

            <Pane
                paddingX={20}
                paddingY={10}
                display="flex"
                justifyContent="flex-start"
            >
                <IconButton
                    marginRight={10}
                    icon="document"
                    onClick={() => fileInput.current.click()}
                />
                <input
                    ref={fileInput}
                    name="schema"
                    type="file"
                    accept=".json"
                    hidden
                    onChange={event => handleFileUpload(event.target.files[0])}
                />
                <IconButton
                    marginRight={10}
                    icon="download"
                    is="a"
                    href={hrefForDownload}
                    download="schema.json"
                />
                <IconButton
                    marginRight={10}
                    icon="cog"
                    onClick={handleSettingsCLick}
                />
                <IconButton
                    icon="play"
                    intent="success"
                    onClick={handleRunClick}
                />
            </Pane>
            <Pane padding={20} marginBottom={20}>
                <Paragraph>
                    Drag and drop these items onto the workspace.
                </Paragraph>
            </Pane>
            {nodes.map((node, i) => (
                <SidebarItem key={i} {...node} />
            ))}
        </div>
    );
};

export default NodesSidebar;
