import * as React from 'react';
import { Pane, Text } from 'evergreen-ui';

const SidebarItem = ({ type, ports, properties }) => (
    <Pane
        marginBottom={10}
        padding={15}
        cursor="pointer"
        border="default"
        display="flex"
        justifyContent="center"
        alignItems="center"
        draggable={true}
        onDragStart={event => {
            event.dataTransfer.setData(
                'react-flow-chart',
                JSON.stringify({ type, ports, properties })
            );
        }}
    >
        <Text size={400}>{type}</Text>
    </Pane>
);

export default SidebarItem;
