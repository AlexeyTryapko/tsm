import React from 'react';
import { withTranslation } from 'react-i18next';
import { Pane, Select } from 'evergreen-ui';

const LanguageSelect = ({ i18n }) => {
    const changeLanguage = value => {
        i18n.changeLanguage(value);
    };
    return (
        <Pane
            paddingX={20}
            paddingY={10}
            display="flex"
            justifyContent="flex-start"
        >
            <Select
                onChange={event => changeLanguage(event.target.value)}
                defaultValue="en"
            >
                <option value="en">EN</option>
                <option value="ua">UA</option>
                <option value="ru">RU</option>
            </Select>
        </Pane>
    );
};

export default withTranslation()(LanguageSelect);
