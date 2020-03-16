import React from 'react';
import { withTranslation } from 'react-i18next';
import { Pane, Tooltip, IconButton } from 'evergreen-ui';

const SimulationControls = ({ handleSettingsCLick, handleRunClick, t }) => (
    <Pane display="flex" justifyContent="flex-start">
        <Tooltip content={t('openGlobalSettings')}>
            <IconButton
                marginRight={10}
                icon="cog"
                onClick={handleSettingsCLick}
            />
        </Tooltip>
        <Tooltip content={t('startSimulation')}>
            <IconButton icon="play" intent="success" onClick={handleRunClick} />
        </Tooltip>
    </Pane>
);

export default withTranslation()(SimulationControls);
