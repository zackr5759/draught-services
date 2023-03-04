import React, {useState, useEffect, useContext, Fragment} from 'react';
import API from "../../API_Interface/API_Interface";

import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables';
import {accountsSummaryAttributes, accountsTableAttributes} from './accountsTableAttributes';
import {CycleIDContext} from "../../CycleID/CycleIDProvider";


const AccountsForEntity = (props) => {
    const {marketID, routeID, rowspecs} = props;
    const [accountsForRoute, setAccountsForRoute] = useState([]);
    const [accountsToDisplay, setAccountsToDisplay] = useState(accountsForRoute);

    const context = useContext(CycleIDContext);


    const idAttribute = 'accountID';
    const nameAttribute = 'accountName';

    const dependencyExpression = context && context.cycleID.cycleID;

    useEffect(() => {
        if( !context.cycleID )
            return;

        const api = new API();

        async function getRoutes() {
            let routesJSONString;
            let rowspecs;
            if(marketID){
                rowspecs = accountsTableAttributes;
                routesJSONString = await api.accountsForMarket(marketID);
            }
            else{
                rowspecs = accountsSummaryAttributes;
                routesJSONString = await api.accountsSummaryForRoute(context.cycleID.cycleID, routeID);
            }
            // console.log(`accounts for routeID ${routeID} from the DB ${JSON.stringify(routesJSONString)}`);
            setAccountsForRoute(routesJSONString.data);
            setAccountsToDisplay(routesJSONString.data);
        }

        getRoutes();
    }, [dependencyExpression, routeID]);

    const filterAccounts = (changeEvent) => {
        // console.log(`before: filterAccounts called with search value: ${changeEvent.target.value.trim()}`);
        if(accountsForRoute.length === 0 || changeEvent.target.value.trim().length === 0) {
            setAccountsToDisplay(accountsForRoute);
            return;
        }

        const pattern = changeEvent.target.value.trim().toLocaleLowerCase();
        const rows = accountsForRoute.filter(account => account[nameAttribute].toLowerCase().match(pattern) );
        setAccountsToDisplay(rows);
    };


    return <Fragment>
        {
            accountsForRoute.length > 0 && <BaseCollapsibleTables rows={accountsToDisplay}
                                                                  tableSpecs={ {rowSpecs: rowspecs,
                                                                                collapsible: false } }
                                                                  idAttribute={idAttribute}
                                                                  searchBarInfo={{
                                                                      placeholder: 'Filter by account name',
                                                                      inputChangeHandler: filterAccounts
                                                                  }}
                                                                  component={null}
                                            />
        }
    </Fragment>
};

export default AccountsForEntity;
