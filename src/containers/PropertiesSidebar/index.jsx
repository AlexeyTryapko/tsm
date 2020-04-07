import * as React from 'react';
import { SideSheet } from 'evergreen-ui';
import { FormNotFound, GlobalPropertiesForm } from '../../components/forms';
import {componentReferences} from '../../configs/components';


const getFormComponent = type => {
    if(type==='GLOBAL')
        return GlobalPropertiesForm;
    let comp =  componentReferences[type]
    if(!comp)
        return FormNotFound;
    else
        return comp;
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
