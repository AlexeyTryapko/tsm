import * as React from 'react';
import { withTranslation } from 'react-i18next';
import { Pane, Text } from 'evergreen-ui';

const Node = ({ node, t }) => (
    <Pane
        padding={20}
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Text size={400}>{t(node.type)}</Text>
    </Pane>
);

export default withTranslation()(Node);
