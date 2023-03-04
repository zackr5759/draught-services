import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const HelperText = (props) => {
    const {text} = props;

    return <Typography component='span'>{text}</Typography>
};

const  CustomTextField = (props) => {
    const {width, label, value, onChange, disabled, requiredAttribute, helperText } = props;

    return (
    <Box
        component="form"
        sx={{
            '& > :not(style)': {width: {width}},
        }}
    >
        <Box sx={{display: "flex",flexDirection: 'row' }} >
            {requiredAttribute &&
            <Box sx={{
                ml: -2, mr: 1, mb: -1, display: "flex", alignItems: "flex-end", justifyContents: 'flex-start',
                '& > :not(style)': {width: 8}
            }}>
                <FiberManualRecordIcon fontSize="small" color='secondary'/>
            </Box>
            }
        <Box sx={{ '& > :not(style)': {width: width},
            display: "flex",
            justifyContents: 'flex-end',
        }}
        >
        <TextField
            id="standard-basic"
            label={label}
            width="100%"
            variant="standard"
            value={value}
            disabled={disabled}
            helperText=<HelperText text={helperText} />
            onChange={event => onChange(event.target.value)}
            onKeyPress={(event) => {
                if (event.key === 'Enter')
                    event.preventDefault();
            }}
        />
        </Box>
        </Box>

    </Box>
    )
}

export default CustomTextField;