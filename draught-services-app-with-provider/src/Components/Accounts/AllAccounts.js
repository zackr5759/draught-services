import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables'
import {accountsTableAttributes} from './accountsTableAttributes';


let keyID = 0;

const nextKey = () => keyID++;

export default function RouteTable(props) {

    const [accounts, setAccounts] = useState([]);
    const [accountsToDisplay, setAccountsToDisplay] = useState(accounts);
    console.log(`in RouteTable accounts contains is ${JSON.stringify(accounts)}`);

    useEffect(() => {
        const api = new API();

        async function getAccounts() {
            const accountsJSONString = await api.allAccounts();
            console.log(`accounts from the DB ${JSON.stringify(accountsJSONString)}`);
            setAccounts(accountsJSONString.data);
            setAccountsToDisplay(accountsJSONString.data);
        }

        getAccounts();
    }, []);

    const filterAccounts = (changeEvent) => {
        // console.log(`before: filterAccounts called with search value: ${changeEvent.target.value.trim()}`);
        if(accounts.length === 0 || changeEvent.target.value.trim().length === 0) {
            setAccountsToDisplay(accounts);
            return;
        }

        const pattern = changeEvent.target.value.trim().toLocaleLowerCase();
        const rows = accounts.filter(account => account["accountName"].toLowerCase().match(pattern) );
        setAccountsToDisplay(rows);
    };

    return (
        <Fragment>
            <BaseCollapsibleTables rows={accountsToDisplay}
                                   tableSpecs={ {rowSpecs: accountsTableAttributes, collapsible: false } }
                                   idAttribute={"test"}
                                   searchBarInfo={{
                                       placeholder: 'Filter by Account name',
                                       inputChangeHandler: filterAccounts
                                   }}
            />
        </Fragment>
    )
}