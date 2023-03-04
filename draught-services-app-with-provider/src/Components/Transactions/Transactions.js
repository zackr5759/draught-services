import React, {useState, useEffect, useContext, Fragment} from 'react';
import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables'

import SelectableTable from '../ComponentUtils/SelectableTable';

import {transactionsAttributesForSummary,
        transactionsAttributesForSummary_v2} from '../Transactions/transactionsTableAttributes';
import API from "../../API_Interface/API_Interface";
import {CycleIDContext} from '../../CycleID/CycleIDProvider';


const idAttribute = 'cycleID';
export default function Transactions(props) {

    const context = useContext(CycleIDContext);

    // console.log(`Transactions using context: cycleID = ${JSON.stringify(context.cycleID)}`);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if(! context.cycleID )
             return;

        const api = new API();

        async function getTransactions() {
            const transactionsJSONString = await api.transactionsAttributesForSummary(51);
            // console.log(`transactions from the DB ${JSON.stringify(transactionsJSONString)}`);
            setTransactions(transactionsJSONString.data);
        }
        getTransactions();
    }, []);

    return (
        <Fragment>
            <SelectableTable rows={transactions}
                             attributes={ transactionsAttributesForSummary_v2 }
                             title='Transaction Summary'
                             keyOfUniqValue='cycleID'
            />
        </Fragment>
    )
}

/*
original fragment
        <Fragment>
            <BaseCollapsibleTables rows={transactions}
                                   tableSpecs={ {rowSpecs: transactionsAttributesForSummary,
                                                 collapsible: false } }
                                   idAttribute={idAttribute}
                                   component={null}
            />
        </Fragment>

 */