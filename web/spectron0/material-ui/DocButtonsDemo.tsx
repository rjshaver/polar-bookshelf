import React from "react";
import IconButton from "@material-ui/core/IconButton";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FlagIcon from '@material-ui/icons/Flag';
import ArchiveIcon from '@material-ui/icons/Archive';
import grey from "@material-ui/core/colors/grey";
import useTheme from "@material-ui/core/styles/useTheme";
import {MUIDocDropdownButton} from "./doc_repo_table/MUIDocDropdownButton";
import Tooltip from "@material-ui/core/Tooltip";

interface IProps {
    readonly className?: string;
    readonly flagged: boolean;
    readonly archived: boolean;
    readonly onTag: () => void;
    readonly onArchive: () => void;
    readonly onFlag: () => void;
    readonly onDropdown: () => void;
}

export const DocButtons = React.memo((props: IProps) => {

    const theme = useTheme();

    const activeColor = (active: boolean) => {
        return active ? theme.palette.primary.main : theme.palette.text.secondary;
    };

    return (

        <div className={props.className || ''}>

            <Tooltip title="Tag">
                <IconButton size="small"
                            style={{color: grey[500]}}>
                    <LocalOfferIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Archive">
                <IconButton size="small"
                            style={{color: activeColor(props.archived)}}>
                    <ArchiveIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Flag">
                <IconButton size="small"
                            style={{color: activeColor(props.flagged)}}>
                    <FlagIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="More options...">
                <MUIDocDropdownButton/>
            </Tooltip>

        </div>
    );

});

export const DocButtonsDemo = () => (
    // <DocButtons archived={false} flagged={false}/>
    <div></div>
);

