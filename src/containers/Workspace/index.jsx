import * as React from 'react';
import { defaultChart, nodesConfig, globalProperties } from '../../configs';
import { actions } from '@mrblenny/react-flow-chart';
import { cloneDeep } from 'lodash';
import NodesSidebar from '../../containers/NodesSidebar';
import Schema from '../../containers/Schema';
import InfoBlock from '../../containers/InfoBlock';
import { start } from '../../services/simulation';
import { toaster } from 'evergreen-ui';

export class Workspace extends React.Component {
    constructor(props) {
        super();
        this.state = {
            ...props.workspace,
            showGlobalSettings: false,
        };
    }
    clearSelectedItem() {
        this.setState({
            selected: {},
        });
    }
    toggleGlobalSettings(val) {
        this.setState({
            showGlobalSettings: val,
        });
    }
    updateGlobalSettings(props) {
        this.setState({
            globalProperties: {
                ...this.state.globalProperties,
                ...props,
            },
        });
    }
    getSchemaDownloadHref() {
        const schema = JSON.stringify(this.state);
        const blob = new Blob([schema], { type: 'application/octet-stream' });
        return URL.createObjectURL(blob);
    }
    getNodeProperties(id) {
        const { nodes } = this.state;
        return nodes[id]?.properties;
    }
    getNodeType(id) {
        const { nodes } = this.state;
        return nodes[id]?.type;
    }
    updateProperties(id, properties) {
        const { nodes } = this.state;
        const { properties: oldProps } = nodes[id];
        this.setState({
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
    }
    getNodeInfoBlock(stateActions) {
        const { id: selectedId } = this.state.selected;
        const props = {
            type: this.getNodeType(selectedId),
            closeInfo: () => this.clearSelectedItem(),
            updateProperties: this.updateProperties.bind(this, selectedId),
            properties: this.getNodeProperties(selectedId),
            data: this.getNodeProperties(selectedId).chartData,
            deleteNode: () => stateActions.onDeleteKey({}),
        };
        return <InfoBlock {...props} />;
    }
    getGlobalInfoBlock() {
        const { globalProperties } = this.state;
        const props = {
            type: 'GLOBAL',
            properties: globalProperties,
            closeInfo: () => this.toggleGlobalSettings(false),
            updateProperties: props => this.updateGlobalSettings(props),
        };

        return <InfoBlock {...props} />;
    }
    getInfoBlock(stateActions) {
        const { selected, showGlobalSettings } = this.state;
        if (showGlobalSettings) {
            return this.getGlobalInfoBlock();
        }

        if (selected.id && selected.type === 'node') {
            return this.getNodeInfoBlock(stateActions);
        }
    }
    simulate() {
        const chart = cloneDeep(this.state);
        let res = undefined;
        do {
            res = start(chart);
        } while (res);
        toaster.success('Simulation is finished');
        this.setState(cloneDeep(chart));
    }
    render() {
        const {
            handleWorkspaceUpload,
            workspaceList,
            selectWorkspace,
            removeWorkspace,
        } = this.props;
        const chart = this.state;
        const stateActions = Object.keys(actions).reduce(
            (res, key) => ({
                ...res,
                [key]: (...args) => this.setState(actions[key](...args)),
            }),
            {}
        );
        return (
            <div className="page-content">
                <NodesSidebar
                    nodes={nodesConfig}
                    handleRunClick={() => this.simulate()}
                    handleSettingsCLick={() => this.toggleGlobalSettings(true)}
                    handleFileUpload={handleWorkspaceUpload}
                    hrefForDownload={this.getSchemaDownloadHref()}
                    workspaceList={workspaceList}
                    selectWorkspace={selectWorkspace}
                    removeWorkspace={removeWorkspace}
                    workspaceTitle={chart.schemaTitle}
                    workspaceId={chart.id}
                />
                <Schema chart={chart} actions={stateActions} />
                {this.getInfoBlock(stateActions)}
            </div>
        );
    }
}

export default Workspace;
