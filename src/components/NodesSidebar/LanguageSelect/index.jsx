import React from 'react';
import { withTranslation } from 'react-i18next';
import { Pane, Select } from 'evergreen-ui';

const LanguageSelect = ({ i18n }) => {
    const changeLanguage = value => {
        i18n.changeLanguage(value);
        window.localStorage.setItem('lang', value);
    };
    return (
        <Pane
            display="flex"
            justifyContent="flex-start"
            marginRight={10}
            width={74}
        >
            <Select
                onChange={event => changeLanguage(event.target.value)}
                defaultValue={i18n.language}
            >
                <option value="en">EN</option>
                <option value="ua">UA</option>
                <option value="ru">RU</option>
            </Select>
        </Pane>
    );
};

export default withTranslation()(LanguageSelect);
