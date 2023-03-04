import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables'
import {routesSummaryTableAttributes} from './routesTableAttributes';


let keyID = 0;

const nextKey = () => keyID++;

export default function RouteTable(props) {

    const [routes, setRoutes] = useState([]);
    const [routesToDisplay, setRoutesToDisplay] = useState(routes);

    useEffect(() => {
        const api = new API();

        async function getRoutes() {
            const routesJSONString = await api.allRoutesSummary();
            setRoutes(routesJSONString.data);
            setRoutesToDisplay(routesJSONString.data);
        }

        getRoutes();
    }, []);

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
                                   tableSpecs={ {rowSpecs: routesSummaryTableAttributes, collapsible: false } }
                                   idAttribute={"test"}
                                   searchBarInfo={{
                                       placeholder: 'Filter by market name',
                                       inputChangeHandler: filterRows
                                   }}
            />
        </Fragment>
    )
}