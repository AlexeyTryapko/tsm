import * as React from 'react';

const SidebarItem = ({ type, ports, properties }) => (
    <div
        draggable={true}
        onDragStart={event => {
            event.dataTransfer.setData(
                'react-flow-chart',
                JSON.stringify({ type, ports, properties })
            );
        }}
        className="sidebar-item"
    >
        {type}
    </div>
);

export default SidebarItem;
