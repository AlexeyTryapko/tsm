import * as React from 'react';
import { Pane, Text } from 'evergreen-ui';

const Node = ({ node }) => (
    <Pane
        padding={20}
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Text size={400}>{node.type}</Text>
    </Pane>
);

export default Node;
