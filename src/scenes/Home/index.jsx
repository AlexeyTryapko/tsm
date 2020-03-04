import * as React from 'react';
import { defaultChart, nodesConfig, globalProperties } from '../../configs';
import { actions } from '@mrblenny/react-flow-chart';
import { cloneDeep } from 'lodash';
import NodesSidebar from '../../containers/NodesSidebar';
import PropertiesSidebar from '../../containers/PropertiesSidebar';
import Workspace from '../../containers/Workspace';
import { start } from '../../services/simulation';
import MonitorModal from '../../components/modals/Monitor';
import ComporatorModal from '../../components/modals/Comparator';

import { toaster } from 'evergreen-ui';

export class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            ...defaultChart,
            globalProperties,
            showGlobalSettings: false,
            showComparatorModal: false,
        };
    }
    clearSelectedItem() {
        this.setState({
            selected: {},
        });
    }
    toggleComporatorModal(val) {
        this.setState({
            showComparatorModal: val,
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
    getMonitorModal(selectedNodeId, stateActions) {
        return (
            <MonitorModal
                isShown={true}
                closeModal={() => this.clearSelectedItem()}
                deleteNode={() => stateActions.onDeleteKey({})}
                data={this.getNodeProperties(selectedNodeId)?.chartData}
            />
        );
    }
    getBlockPropertiesSideBar(stateActions) {
        const { id: selectedId } = this.state.selected;
        const props = {
            isShown: true,
            type: this.getNodeType(selectedId),
            closeSidebar: () => this.clearSelectedItem(),
            updateProperties: this.updateProperties.bind(this, selectedId),
            properties: this.getNodeProperties(selectedId),
            deleteNode: () => stateActions.onDeleteKey({}),
            openComporatorModal: () => this.toggleComporatorModal(true),
        };

        return <PropertiesSidebar {...props} />;
    }
    getGlobalPropertiesSideBar() {
        const { globalProperties } = this.state;
        const props = {
            isShown: true,
            type: 'GLOBAL',
            properties: globalProperties,
            closeSidebar: () => this.toggleGlobalSettings(false),
            updateProperties: props => this.updateGlobalSettings(props),
        };

        return <PropertiesSidebar {...props} />;
    }
    getInfoBlock(stateActions) {
        const { selected, showGlobalSettings } = this.state;
        if (showGlobalSettings) {
            return this.getGlobalPropertiesSideBar();
        }

        if (selected.id && selected.type === 'node') {
            const { name } = this.getNodeProperties(selected.id);
            if (name.includes('MONITOR')) {
                return this.getMonitorModal(selected.id, stateActions);
            }
            if (name.includes('CORRELATOR')) {
                return undefined;
            }
            return this.getBlockPropertiesSideBar(stateActions);
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
                />
                <Workspace chart={chart} actions={stateActions} />
                {this.getInfoBlock(stateActions)}
                <ComporatorModal
                    isShown={chart.showComparatorModal}
                    closeModal={() => this.toggleComporatorModal(false)}
                    sequence={
                        this.getNodeProperties(chart.selected.id)?.sequence
                    }
                />
            </div>
        );
    }
}

export default Home;
