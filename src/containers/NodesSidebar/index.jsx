import React from 'react';
import NodeItem from '../../components/NodesSidebar/NodeItem';
import WorkspaceSelect from '../../components/NodesSidebar/WorkspaceSelect';
import LanguageSelect from '../../components/NodesSidebar/LanguageSelect';
import WorkspaceControls from '../../components/NodesSidebar/WorkspaceControls';
import SimulationControls from '../../components/NodesSidebar/SimulationControls';
import { Paragraph, Pane } from 'evergreen-ui';
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
        <Pane padding={20} marginBottom={20}>
            <Paragraph>{t('instructionOfAddingNodes')}.</Paragraph>
        </Pane>
        {nodes.map((node, i) => (
            <NodeItem key={i} {...node} />
        ))}
    </div>
);

export default withTranslation()(NodesSidebar);
