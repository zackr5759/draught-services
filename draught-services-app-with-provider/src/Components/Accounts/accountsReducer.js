
export const accountsReducer = (state, action) => {
    switch( action.type ) {
        case 'FETCH_ACCOUNTS_FOR_ROUTE_REQUEST':
            return {
                ...state,
                loading: true,
                error: false,
            };
        case 'FETCH_ACCOUNTS_FOR_ROUTE_REQUEST_SUCCESS':
            const accounts = state.accounts[action.playload.accountID] = action.payload;
            return {
                ...state,
                loading: false,
                accounts,
            };
        case 'FETCH_ACCOUNTS_FOR_ROUTE_REQUEST_ERROR':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.accountData
            };
        default:
            return state;
    }
};
