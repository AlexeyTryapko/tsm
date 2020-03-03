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
    getPropertiesSideBarProps(stateActions) {
        const props = {};
        const { selected, showGlobalSettings, globalProperties } = this.state;

        if (showGlobalSettings) {
            props.isShown = true;
            props.type = 'GLOBAL';
            props.properties = globalProperties;
            props.closeSidebar = () => this.toggleGlobalSettings(false);
            props.updateProperties = props => this.updateGlobalSettings(props);
        }

        if (selected.id && selected.type === 'node') {
            props.isShown = true;
            props.type = this.getNodeType(selected.id);
            props.closeSidebar = () => this.clearSelectedItem();
            props.updateProperties = this.updateProperties.bind(
                this,
                selected.id
            );
            props.properties = this.getNodeProperties(selected.id);
            props.deleteNode = () => stateActions.onDeleteKey({});
            props.openSignalChartModal = () => this.toggleSignalChartModal();
        }
        return props;
    }
    simulate() {
        const chart = cloneDeep(this.state);
        let res = undefined;
        
        do{
            res = start(chart);
        }while(res)
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
        return (
            <div className="page-content">
                <NodesSidebar
                    nodes={nodesConfig}
                    handleRunClick={() => this.simulate()}
                    handleSettingsCLick={() => this.toggleGlobalSettings(true)}
                />
                <Workspace chart={chart} actions={stateActions} />
                <PropertiesSidebar
                    {...this.getPropertiesSideBarProps(stateActions)}
                />
                <SignalChartModal
                    isShown={chart.showSignalChartModal}
                    closeModal={() => this.toggleSignalChartModal()}
                    data={
                        this.getNodeProperties(selectedNodeId)?.chartData ||
                        mocked
                    }
                />
            </div>
        );
    }
}

export default Home;
