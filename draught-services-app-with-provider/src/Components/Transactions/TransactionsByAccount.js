import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables';
import {accountsTableAttributes} from '../Accounts/accountsTableAttributes';
import TransactionsForEntity from './TransactionsForEntity';
import {transactionsTableAttributes} from './transactionsTableAttributes'


let keyID = 0;

const nextKey = () => keyID++;

export default function TransactionByAccount(props) {

    const [accounts, setAccounts] = useState([]);
    const [accountsToDisplay, setAccountsToDisplay] = useState(accounts);

    const idAttribute = 'accountID';
    useEffect(() => {
        const api = new API();

        async function getAccounts() {
            const accountsJSONString = await api.allAccounts();
            setAccounts(accountsJSONString.data);
            setAccountsToDisplay(accountsJSONString.data);
        }

        getAccounts();
    }, []);

    const transactionForAccountComponent = (row) => {
        return  <TransactionsForEntity accountID={row["accountID"]} collapsible={false}/>
    };

    const filterRows = (changeEvent) => {
        if(accounts.length === 0 || changeEvent.target.value.trim().length === 0) {
            setAccountsToDisplay(accounts);
            return;
        }

        const pattern = changeEvent.target.value.trim().toLocaleLowerCase();
        const rows = accounts.filter(account => account['routeName'].toLowerCase().match(pattern) );
        setAccountsToDisplay(rows);
    };

    return (
        <Fragment>
            <BaseCollapsibleTables rows={accountsToDisplay}
                                   tableSpecs={ {rowSpecs: accountsTableAttributes, collapsible: true } }
                                   component={transactionForAccountComponent}
                                   idAttribute={idAttribute}
                                   searchBarInfo={{
                                       placeholder: 'Filter by market name',
                                       inputChangeHandler: filterRows
                                   }}
            />
        </Fragment>
    )
}