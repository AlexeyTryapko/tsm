import * as React from 'react';
import { SideSheet } from 'evergreen-ui';
import { FormNotFound, GlobalPropertiesForm } from '../../components/forms';
import {nodesConfig} from '../../configs/nodes';

const getFormComponent = type => {
    
    let ret = type==="GLOBAL"?GlobalPropertiesForm:FormNotFound;
    nodesConfig.forEach((node)=>{

        if(node.type===type){
            ret = node.component;
        }
    })

    return ret;
};

const getForm = (
    type,
    properties,
    updateProperties,
    closeSidebar,
    deleteNode,
    useSamples
) => {
    const Component = getFormComponent(type);
    return (
        <Component
            updateAction={updateProperties}
            onConfirmBtnClick={closeSidebar}
            onDeleteNode={deleteNode}
            useSamples={useSamples}
            {...properties}
        />
    );
};

const PropertiesSidebar = ({
    type,
    properties,
    closeSidebar,
    updateProperties,
    deleteNode,
    useSamples,
}) => (
    <SideSheet isShown={true} onCloseComplete={closeSidebar}>
        {getForm(
            type,
            properties,
            updateProperties,
            closeSidebar,
            deleteNode,
            useSamples
        )}
    </SideSheet>
);

export default PropertiesSidebar;
