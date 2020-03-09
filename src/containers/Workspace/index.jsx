import React, { useState } from 'react';
import { nodesConfig } from '../../configs';
import { cloneDeep } from 'lodash';
import NodesSidebar from '../../containers/NodesSidebar';
import Schema from '../../containers/Schema';
import InfoBlock from '../../containers/InfoBlock';
import { start } from '../../services/simulation';
import { toaster } from 'evergreen-ui';

export const Workspace = ({
    handleWorkspaceUpload,
    selectWorkspace,
    updateWorkspace,
    removeWorkspace,
    workspaceActions,
    workspace,
    workspaceList,
}) => {
    const [showGlobalSettings, toggleGlobalSettings] = useState(false);

    const clearSelectedItem = () => {
        updateWorkspace({
            selected: {},
        });
    };

    const updateGlobalSettings = newParams => {
        updateWorkspace({
            globalProperties: {
                ...workspace.globalProperties,
                ...newParams,
            },
        });
    };

    const getSchemaDownloadHref = () => {
        const schema = JSON.stringify(workspace);
        const blob = new Blob([schema], { type: 'application/octet-stream' });
        return URL.createObjectURL(blob);
    };

    const getNodeProperties = id => {
        const { nodes } = workspace;
        return nodes[id]?.properties;
    };

    const getNodeType = id => {
        const { nodes } = workspace;
        return nodes[id]?.type;
    };

    const updateProperties = (id, properties) => {
        const { nodes } = workspace;
        const { properties: oldProps } = nodes[id];
        updateWorkspace({
            nodes: {
                ...nodes,
                [id]: {
                    ...nodes[id],
                    properties: {
                        ...oldProps,
                        ...properties,
                    },
                },
            },
        });
    };

    const getNodeInfoBlock = () => {
        const { id: selectedId } = workspace.selected;
        const props = {
            type: getNodeType(selectedId),
            closeInfo: () => clearSelectedItem(),
            updateProperties: updateProperties.bind(null, selectedId),
            properties: getNodeProperties(selectedId),
            data: getNodeProperties(selectedId).chartData,
            deleteNode: () => workspaceActions.onDeleteKey({}),
        };
        return <InfoBlock {...props} />;
    };

    const getGlobalInfoBlock = () => {
        const { globalProperties } = workspace;
        const props = {
            type: 'GLOBAL',
            properties: globalProperties,
            closeInfo: () => toggleGlobalSettings(false),
            updateProperties: props => updateGlobalSettings(props),
        };

        return <InfoBlock {...props} />;
    };

    const getInfoBlock = () => {
        const { selected, globalProperties } = workspace;
        if (showGlobalSettings) {
            return getGlobalInfoBlock(globalProperties);
        }

        if (selected.id && selected.type === 'node') {
            return getNodeInfoBlock(workspaceActions);
        }
    };

    const simulate = () => {
        const chart = cloneDeep(workspace);
        let res = undefined;
        do {
            res = start(chart);
        } while (res);
        toaster.success('Simulation is finished');
        updateWorkspace(cloneDeep(chart));
    };

    return (
        <div className="page-content">
            <NodesSidebar
                nodes={nodesConfig}
                handleRunClick={() => simulate()}
                handleSettingsCLick={() => toggleGlobalSettings(true)}
                handleFileUpload={handleWorkspaceUpload}
                hrefForDownload={getSchemaDownloadHref()}
                workspaceList={workspaceList}
                selectWorkspace={selectWorkspace}
                removeWorkspace={removeWorkspace}
                workspaceTitle={workspace.schemaTitle}
                workspaceId={workspace.id}
            />
            <Schema chart={workspace} actions={workspaceActions} />
            {getInfoBlock()}
        </div>
    );
};

export default Workspace;
