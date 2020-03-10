import React from 'react';
import SidebarItem from '../../components/SidebarItem';
import {
    Paragraph,
    Pane,
    IconButton,
    SelectMenu,
    Button,
    Tooltip,
} from 'evergreen-ui';

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
    removeWorkspace,
    addWorkspace,
}) => {
    const fileInput = React.createRef();
    return (
        <div className="sidebar">
            <SelectMenu
                title="Select name"
                options={workspaceList}
                selected={workspaceId}
                onSelect={item => selectWorkspace(item.value)}
            >
                <Tooltip content="Select schema">
                    <Button marginX={20} marginY={10}>
                        {workspaceTitle}
                    </Button>
                </Tooltip>
            </SelectMenu>
            <Pane
                paddingX={20}
                paddingY={10}
                display="flex"
                justifyContent="flex-start"
            >
                <Tooltip content="Close schema">
                    <IconButton
                        marginRight={10}
                        icon="cross"
                        intent="danger"
                        disabled={workspaceList.length === 1}
                        onClick={removeWorkspace}
                    />
                </Tooltip>
                <Tooltip content="New schema">
                    <IconButton
                        marginRight={10}
                        icon="plus"
                        onClick={addWorkspace}
                    />
                </Tooltip>
                <Tooltip content="Open schema">
                    <IconButton
                        marginRight={10}
                        icon="document"
                        onClick={() => fileInput.current.click()}
                    />
                </Tooltip>
                <input
                    ref={fileInput}
                    name="schema"
                    type="file"
                    accept=".json"
                    hidden
                    onChange={event => handleFileUpload(event.target.files[0])}
                />
                <Tooltip content="Save schema">
                    <IconButton
                        icon="download"
                        is="a"
                        href={hrefForDownload}
                        download={`${workspaceTitle}.json`}
                    />
                </Tooltip>
            </Pane>
            <Pane
                paddingX={20}
                paddingY={10}
                display="flex"
                justifyContent="flex-start"
            >
                <Tooltip content="Open global settings">
                    <IconButton
                        marginRight={10}
                        icon="cog"
                        onClick={handleSettingsCLick}
                    />
                </Tooltip>
                <Tooltip content="Start simulation">
                    <IconButton
                        icon="play"
                        intent="success"
                        onClick={handleRunClick}
                    />
                </Tooltip>
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
