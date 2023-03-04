
import React, {Fragment, useEffect, useState} from 'react';
import API from "../../API_Interface/API_Interface";

import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables'
import {marketSummaryAttributes} from '../Markets/marketsTableAttributes';

import TransactionsByRoute from '../Transactions/TransactionsByRoute';

export default function TransactionsByMarket(props) {

    const [markets, setMarkets] = useState([]);
    const [marketsToDisplay, setMarketsToDisplay] = useState(markets);

    const idAttribute = 'marketID';

    useEffect(() => {
        const api = new API();

        async function getMarkets() {
            const marketsJSONString = await api.allMarketsSummary();
            console.log(`markets from the DB ${JSON.stringify(marketsJSONString)}`);
            setMarkets(marketsJSONString.data);
            setMarketsToDisplay(marketsJSONString.data);
        }

        getMarkets();
    }, []);

    const filterRoutesByMarket = (marketID, routes) => {
        return routes.filter(route => route.marketID === marketID );
    };

    const filterRows = (changeEvent) => {
        if(markets.length === 0 || changeEvent.target.value.trim().length === 0) {
            setMarketsToDisplay(markets);
            return;
        }
        // a backslash will crash the filter function
        if (changeEvent.target.value != '\\' ){
        const pattern = changeEvent.target.value.trim().toLocaleLowerCase();
        const rows = markets.filter(route => route['marketName'].toLowerCase().match(pattern) );
        setMarketsToDisplay(rows);
        }
    };

    return (
        <Fragment>
            <BaseCollapsibleTables rows={marketsToDisplay}
                                   tableSpecs={ {rowSpecs: marketSummaryAttributes, collapsible: false } }
                                   idAttribute={idAttribute}
                                   searchBarInfo={{
                                       placeholder: 'Filter by market name',
                                       inputChangeHandler: filterRows
                                   }}
            />
        </Fragment>
    )
}
