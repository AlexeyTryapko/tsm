import React, { useState } from 'react';
import { defaultChart, globalProperties } from '../../configs';
import { cloneDeep } from 'lodash';
import Workspace from '../../containers/Workspace';
import uuid from 'uuid/v4';

export const Home = () => {
    const getDefaultWorkspace = () =>
        cloneDeep({
            ...defaultChart,
            globalProperties,
            id: uuid(),
        });

    const [workspaces, setWorkspaces] = useState([getDefaultWorkspace()]);
    const [currentWorkspaceId, setCurrentWorkspaceId] = useState(
        workspaces[0].id
    );

    const getCurrentWorkspace = () =>
        workspaces.find(({ id }) => currentWorkspaceId === id);
    const workspaceList = workspaces.map(({ id, schemaTitle }) => ({
        value: id,
        label: schemaTitle,
    }));
    const setCurrentWorkspace = id => setCurrentWorkspaceId(id);

    const addWorkspace = (newWorkspace = getDefaultWorkspace()) =>
        setWorkspaces([...workspaces, newWorkspace]);

    const removeWorkspace = id => {
        setWorkspaces(workspaces.filter(({ wId }) => wId !== id));
        if (workspaces.length === 1) {
            addWorkspace();
        }
        setCurrentWorkspace(workspaces[0].id);
    };

    const handleWorkspaceUpload = file => {
        const fr = new FileReader();
        fr.addEventListener('load', () => {
            const newWorkspace = {
                ...JSON.parse(fr.result),
                schemaTitle: file.name.replace('.json', ''),
            };
            addWorkspace(newWorkspace);
            setCurrentWorkspace(newWorkspace.id);
        });

        fr.readAsText(file);
    };

    return (
        <Workspace
            handleWorkspaceUpload={handleWorkspaceUpload}
            selectWorkspace={setCurrentWorkspace}
            removeWorkspace={removeWorkspace}
            workspace={getCurrentWorkspace()}
            workspaceList={workspaceList}
        />
    );
};

export default Home;
