import * as React from 'react';
import { Pane, Text } from 'evergreen-ui';

const Node = ({ node }) => (
    <Pane
        padding={30}
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Text size={500}>{node.type}</Text>
    </Pane>
);

export default Node;
