import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const CustomAutocoplete = (props) => {
    const {options, getOptionLabel, width, onChange, label, requiredAttribute } = props;

    return (
        <Box sx={{
            '& > :not(style)': {width: width},
        }} component="form">

            <Box sx={{display: "flex", flexDirection: 'row'}}>
                {requiredAttribute &&
                <Box sx={{
                    ml: -2, mr: 1, mb: -2, display: "flex", alignItems: "flex-end", justifyContents: 'flex-start',
                    '& > :not(style)': {width: 8}
                }}>
                    <FiberManualRecordIcon fontSize="large" color='secondary'/>
                </Box>
                }
                <Box sx={{
                    '& > :not(style)': {width: width},
                    display: "flex",
                    justifyContents: 'flex-end',
                }}
                >
                    <Autocomplete
                        options={options}
                        color="secondary.main"
                        getOptionLabel={option => getOptionLabel(option)}
                        id="auto-highlight"
                        autoHighlight
                        onChange={(event, newValue) => onChange(newValue)}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter')
                                event.preventDefault();
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label={label} variant="standard"/>
                        )}
                    />
                </Box>
            </Box>
        </Box>
    )
};

export default CustomAutocoplete;