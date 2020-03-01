import * as React from 'react';
import { defaultChart, nodesConfig } from '../../configs';
import { actions } from '@mrblenny/react-flow-chart';
import NodesSidebar from '../../containers/NodesSidebar';
import PropertiesSidebar from '../../containers/PropertiesSidebar';
import Workspace from '../../containers/Workspace';

export class Home extends React.Component {
    constructor() {
        super();
        this.state = defaultChart;
    }
    clearSelectedItem() {
        this.setState({
            selected: {},
        });
    }
    getNodeType(id) {
        const { nodes } = this.state;
        return nodes[id]?.type;
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
                <NodesSidebar nodes={nodesConfig} />
                <Workspace chart={chart} actions={stateActions} />
                <PropertiesSidebar
                    isShown={!!chart.selected.id}
                    id={chart.selected.id}
                    type={this.getNodeType(chart.selected.id)}
                    closeSidebar={() => this.clearSelectedItem()}
                />
            </div>
        );
    }
}

export default Home;
