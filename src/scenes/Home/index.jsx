import React from 'react';
import { defaultChart, globalProperties } from '../../configs';
import { cloneDeep } from 'lodash';
import Workspace from '../../containers/Workspace';
import uuid from 'uuid/v4';
import { actions } from '@mrblenny/react-flow-chart';

export class Home extends React.Component {
    constructor() {
        super();
        const defaultWorkspace = this.getDefaultWorkspace();
        this.state = {
            workspaces: [defaultWorkspace],
            currentWorkspaceId: defaultWorkspace.id,
        };
    }
    getDefaultWorkspace() {
        return cloneDeep({
            ...defaultChart,
            globalProperties,
            id: uuid(),
        });
    }
    selectWorkspace(id) {
        this.setState({
            currentWorkspaceId: id,
        });
    }
    updateWorkspace(newData) {
        const { currentWorkspaceId, workspaces } = this.state;
        const workspaceIndex = workspaces.findIndex(
            ({ id }) => id === currentWorkspaceId
        );
        workspaces[workspaceIndex] = cloneDeep({
            ...workspaces[workspaceIndex],
            ...newData,
        });
        this.setState({
            workspaces,
        });
    }
    addWorkspace(newWorkspace = this.getDefaultWorkspace()) {
        const sameWorkspace = this.state.workspaces.findIndex(
            ({ id }) => id === newWorkspace.id
        );
        if (sameWorkspace !== -1) {
            newWorkspace.id = uuid();
        }
        this.setState({
            workspaces: [...this.state.workspaces, newWorkspace],
        });
        return newWorkspace;
    }
    handleWorkspaceUpload(file) {
        const fr = new FileReader();
        fr.addEventListener('load', () => {
            const newWorkspace = {
                ...JSON.parse(fr.result),
                schemaTitle: file.name.replace('.json', ''),
            };
            this.addWorkspace(newWorkspace);
            this.selectWorkspace(newWorkspace.id);
        });
        try {
            fr.readAsText(file);
        } catch (e) {
            console.warn(e);
        }
    }
    getWorkspaceActions() {
        return Object.keys(actions).reduce(
            (res, key) => ({
                ...res,
                [key]: (...args) => {
                    const { currentWorkspaceId, workspaces } = this.state;

                    const workspaceIndex = workspaces.findIndex(
                        ({ id }) => id === currentWorkspaceId
                    );
                    workspaces[workspaceIndex] = actions[key](...args)(
                        workspaces[workspaceIndex]
                    );
                    this.setState({
                        workspaces,
                    });
                },
            }),
            {}
        );
    }
    newWorkspace() {
        const workspace = this.addWorkspace();
        this.selectWorkspace(workspace.id);
    }
    removeWorkspace() {
        const { currentWorkspaceId, workspaces } = this.state;
        const filteredWorkspaces = workspaces.filter(
            ({ id }) => currentWorkspaceId !== id
        );
        this.setState({
            workspaces: filteredWorkspaces,
        });
        this.selectWorkspace(filteredWorkspaces[0].id);
    }
    render() {
        const { workspaces, currentWorkspaceId } = this.state;
        const currentWorkspace = workspaces.find(
            ({ id }) => currentWorkspaceId === id
        );
        const workspaceList = workspaces.map(({ id, schemaTitle }) => ({
            value: id,
            label: schemaTitle,
        }));
        return (
            <Workspace
                handleWorkspaceUpload={file => this.handleWorkspaceUpload(file)}
                selectWorkspace={id => this.selectWorkspace(id)}
                updateWorkspace={newData => this.updateWorkspace(newData)}
                workspaceActions={this.getWorkspaceActions()}
                workspace={currentWorkspace || this.getDefaultWorkspace()}
                workspaceList={workspaceList}
                removeWorkspace={() => this.removeWorkspace()}
                addWorkspace={() => this.newWorkspace()}
            />
        );
    }
}

export default Home;
