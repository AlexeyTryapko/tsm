import React from 'react';
import NodeItem from '../../components/NodesSidebar/NodeItem';
import WorkspaceSelect from '../../components/NodesSidebar/WorkspaceSelect';
import LanguageSelect from '../../components/NodesSidebar/LanguageSelect';
import WorkspaceControls from '../../components/NodesSidebar/WorkspaceControls';
import SimulationControls from '../../components/NodesSidebar/SimulationControls';
import { withTranslation } from 'react-i18next';

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
    t,
}) => (
    <div className="sidebar">
        <WorkspaceSelect
            options={workspaceList}
            selectedValue={workspaceId}
            selectedLabel={workspaceTitle}
            handleSelect={selectWorkspace}
        />
        <LanguageSelect />
        <WorkspaceControls
            disableClodeBtn={workspaceList.length === 1}
            removeWorkspace={removeWorkspace}
            addWorkspace={addWorkspace}
            handleWorkspaceUpload={handleFileUpload}
            workspaceTitle={workspaceTitle}
            hrefForDownload={hrefForDownload}
        />
        <SimulationControls
            handleRunClick={handleRunClick}
            handleSettingsCLick={handleSettingsCLick}
        />
        <div className="scrollable-list">
            {nodes.map((node, i) => (
                <NodeItem key={i} {...node} />
            ))}
        </div>
    </div>
);

export default withTranslation()(NodesSidebar);
