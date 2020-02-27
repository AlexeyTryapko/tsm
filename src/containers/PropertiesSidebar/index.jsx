import * as React from 'react';

const PropertiesSidebar = ({ id, type }) => (
    <div className="sidebar">
        <div>Type: {type}</div>
        <div>ID: {id}</div>
    </div>
);

export default PropertiesSidebar;
