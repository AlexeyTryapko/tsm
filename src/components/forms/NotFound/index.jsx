import * as React from 'react';
import { Pane, Heading } from 'evergreen-ui';

const FormNotFound = () => (
    <Pane
        padding={20}
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Heading size={700}>Form not found</Heading>
    </Pane>
);

export default FormNotFound;
