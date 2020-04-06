import React from 'react';
import { withTranslation } from 'react-i18next';
import { Pane, Tooltip, IconButton } from 'evergreen-ui';

const WorkspaceControls = ({
    disableClodeBtn,
    removeWorkspace,
    addWorkspace,
    handleWorkspaceUpload,
    workspaceTitle,
    hrefForDownload,
    t,
}) => {
    const fileInput = React.createRef();

    return (
        <Pane
            paddingX={20}
            paddingY={10}
            display="flex"
            justifyContent="flex-start"
        >
            <Tooltip content={t('closeSchema')}>
                <IconButton
                    marginRight={10}
                    icon="cross"
                    intent="danger"
                    disabled={disableClodeBtn}
                    onClick={removeWorkspace}
                />
            </Tooltip>
            <Tooltip content={t('newSchema')}>
                <IconButton
                    marginRight={10}
                    icon="plus"
                    onClick={addWorkspace}
                />
            </Tooltip>
            <Tooltip content={t('openSchema')}>
                <IconButton
                    marginRight={10}
                    icon="document"
                    onClick={() => fileInput.current.click()}
                />
            </Tooltip>
            <input
                ref={fileInput}
                name="schema"
                type="file"
                accept=".json"
                hidden
                onChange={event => handleWorkspaceUpload(event.target.files[0])}
            />
            <Tooltip content={t('saveSchema')}>
                <IconButton
                    icon="download"
                    is="a"
                    href={hrefForDownload}
                    download={`${workspaceTitle}.json`}
                />
            </Tooltip>
        </Pane>
    );
};

export default withTranslation()(WorkspaceControls);
