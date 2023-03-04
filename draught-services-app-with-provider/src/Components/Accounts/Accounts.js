import React, {Fragment, useState} from 'react';

import { accountsSummaryAttributes } from './accountsTableAttributes';
import AccountsForEntity from './AccountsForEntity';
import TransactionsForEntity from '../Transactions/TransactionsForEntity';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function Accounts(props) {
    const [input, setInput] = useState("");
    const [verifyInput, setVerifyInput] = useState(false);

    const handleInputChange = event => {
        console.log("handleInputChange called.");

        setInput(event.target.value);
    };

    return (
        <Fragment>
            {
                verifyInput ? (
                    <TransactionsForEntity accountID={input} collapsible={false}/>
                ) : (
                    <Fragment>
                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>

                            <TextField
                                id="outlined-basic"
                                label="Account ID"
                                placeholder=""
                                value={input}
                                helperText="Enter an AccountID to see related transactions!"
                                onChange={handleInputChange}
                                onKeyPress={(event) => {
                                    if(event.key === "Enter")
                                        event.preventDefault();
                                }}
                            />
                            <Divider />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                    <Button
                                variant="outlined"
                                size="medium"
                                onClick={() => {setVerifyInput(true)}}
                            >Proceed</Button>
                    </Box>
                </Fragment>
                )
            }
        </Fragment>
    )
}
