import * as React from 'react';
import { withTranslation } from 'react-i18next';
import uuid from 'uuid/v4';
import { Pane, Text } from 'evergreen-ui';

const NodeItem = ({ type, ports, properties, t }) => (
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
                JSON.stringify({
                    type,
                    ports,
                    properties: {
                        ...properties,
                        name: properties.name + uuid(),
                    },
                })
            );
        }}
    >
        <Text size={400} textAlign="center">
            {t(type)}
        </Text>
    </Pane>
);

export default withTranslation()(NodeItem);
