
const fetchCycleID = () => {
    return {
        type: 'FETCH_CYCLE_ID',
    }
};

const recordFetchedCycleID = (cycleIDRecord) => {
    return {
        type: 'FETCH_CYCLE_ID_SUCCESS',
        payload: cycleIDRecord,
    }
};

const fetchedCycleIDSuccess = () => {
    return {
        type: 'FETCH_CYCLE_ID_SUCCESS',
    }
};

const fetchedCycleIDError = (errorMsg) => {
    return {
        type: 'FETCH_CYCLE_ID_ERROR',
        payload: errorMsg,
    }
};

export {fetchCycleID, fetchedCycleIDSuccess, fetchedCycleIDError}
