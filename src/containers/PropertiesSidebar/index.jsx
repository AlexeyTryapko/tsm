import * as React from 'react';

const PropertiesSidebar = ({ id, type }) => (
    <div className="sidebar">
        <div className="sidebar-title">
            Drag and drop these items onto the canvas.
        </div>
        <div>Type: {type}</div>
        <div>ID: {id}</div>
    </div>
);

export default PropertiesSidebar;
