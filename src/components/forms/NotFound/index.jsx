import * as React from 'react';
import { Pane, Heading } from 'evergreen-ui';
import { withTranslation } from 'react-i18next';

const FormNotFound = ({ t }) => (
    <Pane
        padding={20}
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Heading size={700}>{t('formNotFound')}</Heading>
    </Pane>
);

export default withTranslation()(FormNotFound);
