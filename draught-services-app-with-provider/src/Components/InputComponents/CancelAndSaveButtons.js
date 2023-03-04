import React, {Fragment} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/material/SvgIcon/SvgIcon";


const CancelAndSaveButtons = (props) => {
    const {width, cancelHandler, saveHandler} = props;

    return <Fragment>
        <Box sx={{mt: 5, '& > :not(style)': {width: width},}}>
            <Box sx={{ display: 'inline', '& > :not(style)': {width: '50%'} }}>
                <Button
                    component="inline"
                    color="secondary"
                    onClick={() => cancelHandler()}
                    variant="outlined"
                >
                    Cancel
                </Button>
            </Box>
            <Box sx={{ display: 'inline', '& > :not(style)': {width: '50%'} }}>
                <Button
                    component="inline"
                    color="primary"
                    onClick={() => {
                        saveHandler()
                    }}
                    startIcon={<SaveIcon/>}
                    variant="outlined"
                >
                    Save
                </Button>
            </Box>
        </Box>
    </Fragment>
};

export default  CancelAndSaveButtons;