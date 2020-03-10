import React from 'react';
import { withTranslation } from 'react-i18next';
import { SelectMenu, Button, Tooltip } from 'evergreen-ui';

const WorkspaceSelect = ({
    options,
    selectedValue,
    selectedLabel,
    handleSelect,
    t,
}) => (
    <SelectMenu
        options={options}
        selected={selectedValue}
        onSelect={item => handleSelect(item.value)}
    >
        <Tooltip content={t('selectSchema')}>
            <Button marginX={20} marginY={10}>
                {selectedLabel}
            </Button>
        </Tooltip>
    </SelectMenu>
);

export default withTranslation()(WorkspaceSelect);
