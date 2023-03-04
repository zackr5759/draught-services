import React, {Fragment, useEffect, useState, useContext} from 'react';

import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables'
import TransactionsForEntity from "./TransactionsForEntity";
import { transactionsAttributesForRoute } from './transactionsTableAttributes';
import {routesSummaryTableAttributes} from '../Routes/routesTableAttributes';
import API from "../../API_Interface/API_Interface";

import {CycleIDContext} from '../../CycleID/CycleIDProvider';

export default function TransactionsByRoutes(props) {

    const [routes, setRoutes] = useState([]);
    const [routesToDisplay, setRoutesToDisplay] = useState(routes);

    const context = useContext(CycleIDContext);

    const idAttribute = 'routeID';
    const dependencyExpression = context && context.cycleID.cycleID;

    useEffect(() => {

        const api = new API();
        async function getRoutes() {
            const routesJSONString = await api.allRoutesSummary(context.cycleID.cycleID);
            // console.log(`routes from the DB ${JSON.stringify(routesJSONString)}`);
            setRoutes(routesJSONString.data);
            setRoutesToDisplay(routesJSONString.data);
        }

        getRoutes();
    }, [dependencyExpression]);

    const transactionForRouteComponent = (row) => {
        return  <TransactionsForEntity routeID={row["routeID"]} collapsible={false} />
    };

    const filterRows = (changeEvent) => {
        if(routes.length === 0 || changeEvent.target.value.trim().length === 0) {
            setRoutesToDisplay(routes);
            return;
        }

        const pattern = changeEvent.target.value.trim().toLocaleLowerCase();
        const rows = routes.filter(route => route['routeName'].toLowerCase().match(pattern) );
        setRoutesToDisplay(rows);

    };

    return (
        <Fragment>
            <BaseCollapsibleTables rows={routesToDisplay}
                                   tableSpecs={ {rowSpecs: transactionsAttributesForRoute, collapsible: true } }
                                   component={transactionForRouteComponent}
                                   idAttribute={idAttribute}
                                   searchBarInfo={{
                                       placeholder: 'Filter by route name',
                                       inputChangeHandler: filterRows
                                   }}
            />
        </Fragment>
    )
}
