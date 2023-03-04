
import React, {Fragment, useEffect, useState} from 'react';
import API from "../../API_Interface/API_Interface";

import BaseCollapsibleTables from '../ComponentUtils/BaseCollapsibleTables'
import {employeeSummaryAttributes} from './employeeTableAttributes';

import TransactionsByRoute from '../Transactions/TransactionsByRoute';

export default function Employees(props) {

    const [employees, setEmployees] = useState([]);
    const [employeesToDisplay, setEmployeesToDisplay] = useState(employees);

    const idAttribute = 'employeeID';

    useEffect(() => {
        const api = new API();

        async function getEmployees() {
            const employeesJSONString = await api.allEmployees();
            setEmployees(employeesJSONString.data);
            setEmployeesToDisplay(employeesJSONString.data);
        }

        getEmployees();
    }, []);


    const filterRows = (changeEvent) => {
        if(employees.length === 0 || changeEvent.target.value.trim().length === 0) {
            setEmployeesToDisplay(employees);
            return;
        }
        // a backslash will crash the filter function
        if (changeEvent.target.value != '\\' ){
        const pattern = changeEvent.target.value.trim().toLocaleLowerCase();
        const rows = employees.filter(route => route['employeeName'].toLowerCase().match(pattern) );
        setEmployeesToDisplay(rows);
        }
    };

    return (
        <Fragment>
            <BaseCollapsibleTables rows={employeesToDisplay}
                                   tableSpecs={ {rowSpecs: employeeSummaryAttributes, collapsible: false } }
                                   idAttribute={idAttribute}
                                   searchBarInfo={{
                                       placeholder: 'Filter by employee name',
                                       inputChangeHandler: filterRows
                                   }}
            />
        </Fragment>
    )
}
