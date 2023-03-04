
import React, {Fragment, useEffect, useState} from 'react';
import API from "../../API_Interface/API_Interface";

import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables'
import {marketSummaryAttributes} from '../Markets/marketsTableAttributes';
import { accountsTableAttributes } from './accountsTableAttributes';
import AccountsForEntity from "./AccountsForEntity";


export default function AccountsByMarket(props) {

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

    const accountForMarketComponent = (row) => {
        return  <AccountsForEntity marketID={row["marketID"]} collapsible={false} rowspecs={accountsTableAttributes} />
    };

    const filterRows = (changeEvent) => {
        if(markets.length === 0 || changeEvent.target.value.trim().length === 0) {
            setMarketsToDisplay(markets);
            return;
        }

        if (changeEvent.target.value != '\\' ){
        const pattern = changeEvent.target.value.trim().toLocaleLowerCase();
        const rows = markets.filter(route => route['marketName'].toLowerCase().match(pattern) );
        setMarketsToDisplay(rows);
        }
    };

    return (
        <Fragment>
            <BaseCollapsibleTables rows={marketsToDisplay}
                                   tableSpecs={ {rowSpecs: marketSummaryAttributes, collapsible: true } }
                                   component={accountForMarketComponent}
                                   idAttribute={idAttribute}
                                   searchBarInfo={{
                                       placeholder: 'Filter by market name',
                                       inputChangeHandler: filterRows
                                   }}
            />
        </Fragment>
    )
}
