import React, {useState, useEffect, useContext, Fragment} from 'react';
import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables'
import {transactionsTableAttributes, transactionsAttributesForAccount} from '../Transactions/transactionsTableAttributes';
import API from "../../API_Interface/API_Interface";
import {CycleIDContext} from '../../CycleID/CycleIDProvider';

export default function TransactionsForEntity(props) {

    const {routeID, accountID, marketID} = props;

    const context = useContext(CycleIDContext);

    const [transactions, setTransactions] = useState([]);
    const [transactionsToDisplay, setTransactionsToDisplay] = useState(transactions);

    const dependencyExpression = context && context.cycleID.cycleID;

    useEffect(() => {
        if(! context.cycleID )
            return;

        const api = new API();
        async function getTransactions() {
            let transactionsJSONString
            if(accountID){
                transactionsJSONString = await api.transactionsForAccountInCycle(accountID, context.cycleID.cycleID);
            }
            else if(marketID){
                transactionsJSONString = await api.transactionsForMarketInCycle(marketID, context.cycleID.cycleID);
            }
            else if(routeID) {
                transactionsJSONString = await api.transactionsForRouteInCycle(routeID, context.cycleID.cycleID);
                // console.log(`transactions from the DB ${JSON.stringify(transactionsJSONString)} for cycleID ${context.cycleID.cycleID} routeID = ${routeID}`);

            } else {
                transactionsJSONString = await api.transactionsForAccountInCycle(accountID, context.cycleID.cycleID);
                // console.log(`transactions from the DB ${JSON.stringify(transactionsJSONString)} for cycleID ${context.cycleID.cycleID} accountID = ${accountID}`);

            }

            setTransactions(transactionsJSONString.data);
            setTransactionsToDisplay(transactionsJSONString.data);
        }
        getTransactions();
    }, [dependencyExpression]);

    const filterTransactions = (changeEvent) => {
        // console.log(`before: filterAccounts called with search value: ${changeEvent.target.value.trim()}`);
        if(transactions.length === 0 || changeEvent.target.value.trim().length === 0) {
            setTransactionsToDisplay(transactions);
            return;
        }

        const pattern = changeEvent.target.value.trim().toLocaleLowerCase();
        const rows = transactions.filter(transaction => transaction["transactionDate"].toLowerCase().match(pattern) );
        setTransactionsToDisplay(rows);
    };

    return (
        <Fragment>
            <BaseCollapsibleTables rows={transactionsToDisplay}
                                   tableSpecs={ {rowSpecs: transactionsAttributesForAccount,
                                                 collapsible: false } }
                                   idAttribute={"transactionID"}
                                   component={null}
                                   searchBarInfo={{
                                    placeholder: 'Filter by Date',
                                    inputChangeHandler: filterTransactions
                                }}
                                   
            />
        </Fragment>
    )
    
}
