import React, {createContext, useEffect, useReducer, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DateTime } from 'luxon';

import API from "../API_Interface/API_Interface";

import cycleIDReducers from './cycleIDReducers';
import {fetchCycleID, fetchedCycleIDSuccess, fetchedCycleIDError} from './cycleIDActions'


const CycleIDContext = createContext(undefined);

let lastNCycleIDs = undefined;
const numCycleIDsToGet = 2;

const CycleIDProvider = ({children}) => {
    const [cycleID, setCycleID] = useState(undefined);
    const [state, dispatch] = useReducer(cycleIDReducers, {loading: false, error: false});
    const {loading, error, errorMsg} = state;

    useEffect(() => {

        const api = new API();
        dispatch(fetchCycleID());
        async function getCycleIDs() {
            const cycleIDs = await api.getCycleIDs(numCycleIDsToGet);
            lastNCycleIDs = cycleIDs.data;
            // console.log(`cycleIDs from the DB ${JSON.stringify(cycleIDs)}`);
            const dStr = DateTime.fromISO(lastNCycleIDs[0].startDate).setZone('America/Los_Angeles').toFormat('MMM dd, yyyy');

            // console.log(`${JSON.stringify(lastNCycleIDs[0].startDate)} to luxon: ${dStr}`);
            dispatch( fetchedCycleIDSuccess());
            setCycleID(lastNCycleIDs[lastNCycleIDs.length - 1]);
        }

        getCycleIDs();
    }, []);

    const ComponentToDisplay = ({children}) => {
        if(loading)
           return  <Box sx={{ display: 'flex' }} component="div" >
                <CircularProgress />
            </Box>;
        else if(error)
            return <Box sx={{ display: 'flex' }} component="div" >
                    <h1>An error occurred while fetching cycle ID: {errorMsg}</h1>
                </Box>;
        else
            return <CycleIDContext.Provider value={{cycleID, setCycleID}}>
                    {children}
                </CycleIDContext.Provider>
    };


    return (
        <React.Fragment>
            <ComponentToDisplay>
                {children}
            </ComponentToDisplay>
        </React.Fragment>
    );
};

export {CycleIDProvider, CycleIDContext}
