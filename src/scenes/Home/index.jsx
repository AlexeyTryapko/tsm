import * as React from 'react';
import { defaultChart, nodesConfig } from '../../configs';
import { actions } from '@mrblenny/react-flow-chart';
import { cloneDeep } from 'lodash';
import NodesSidebar from '../../containers/NodesSidebar';
import PropertiesSidebar from '../../containers/PropertiesSidebar';
import Workspace from '../../containers/Workspace';
import { start } from '../../services/simulation';
import SignalChartModal from '../../containers/SignalChartModal';

const mocked = [
    {
        id: 'noise',
        data: [
            {
                x: 10,
                y: 246,
            },
            {
                x: 23,
                y: 153,
            },
            {
                x: 37,
                y: 1,
            },
            {
                x: 44,
                y: 286,
            },
            {
                x: 54,
                y: 223,
            },
            {
                x: 68,
                y: 282,
            },
            {
                x: 92,
                y: 142,
            },
            {
                x: 102,
                y: 135,
            },
            {
                x: 123,
                y: 263,
            },
        ],
    },
    {
        id: 'signal source',
        data: [
            {
                x: 20,
                y: 238,
            },
            {
                x: 43,
                y: 44,
            },
            {
                x: 45,
                y: 75,
            },
            {
                x: 77,
                y: 162,
            },
            {
                x: 89,
                y: 226,
            },
            {
                x: 106,
                y: 9,
            },
        ],
    },
];

export class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            ...defaultChart,
            globalProperties: {},
            showSignalChartModal: false,
            showGlobalSettings: false,
        };
    }
    clearSelectedItem() {
        this.setState({
            selected: {},
        });
    }
    toggleSignalChartModal() {
        this.setState({
            showSignalChartModal: !this.state.showSignalChartModal,
        });
    }
    toggleGlobalSettings(val) {
        this.setState({
            showGlobalSettings: val,
        });
    }
    updateGlobalSettings(props) {
        this.setState({
            globalProperties: props,
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
        this.setState({
            nodes: {
                ...nodes,
                [id]: {
                    ...nodes[id],
                    properties,
                },
            },
        });
    }
    simulate() {
        const chart = cloneDeep(this.state);
        start(chart);
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
        const selectedNodeId = chart.selected.id;
        const showSideBar = chart.selected.id && chart.selected.type === 'node';
        return (
            <div className="page-content">
                <NodesSidebar
                    nodes={nodesConfig}
                    handleRunClick={() => this.simulate()}
                    handleSettingsCLick={() => this.toggleGlobalSettings(true)}
                />
                <Workspace chart={chart} actions={stateActions} />
                <PropertiesSidebar
                    isShown={showSideBar}
                    type={this.getNodeType(selectedNodeId)}
                    properties={this.getNodeProperties(selectedNodeId)}
                    closeSidebar={() => this.clearSelectedItem()}
                    updateProperties={this.updateProperties.bind(
                        this,
                        selectedNodeId
                    )}
                    deleteNode={() => stateActions.onDeleteKey({})}
                    openSignalChartModal={() => this.toggleSignalChartModal()}
                />
                <SignalChartModal
                    isShown={chart.showSignalChartModal}
                    closeModal={() => this.toggleSignalChartModal()}
                    data={
                        this.getNodeProperties(selectedNodeId)?.chartData ||
                        mocked
                    }
                />
                <PropertiesSidebar
                    isShown={chart.showGlobalSettings}
                    type="GLOBAL"
                    properties={chart.globalProperties}
                    closeSidebar={() => this.toggleGlobalSettings(false)}
                    updateProperties={props => this.updateGlobalSettings(props)}
                />
            </div>
        );
    }
}

export default Home;
