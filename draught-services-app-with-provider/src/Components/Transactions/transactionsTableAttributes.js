import {
    dateToDateString,
    dateToDatetimeString
} from '../../utils/dateTimeZoneAndFormat';


const transactionsAttributesForSingleBrand = [
    {
        attributeName: 'Date',
        datetimeAttribute: true,
        attributeDBName: 'transactionDate',
        align: 'left'
    },
    {
        attributeName: 'ID',
        attributeDBName: 'transactionID',
        align: 'left'
    },
    {
        attributeName: 'Account',
        attributeDBName: 'accountName',
        align: 'left'
    },
    {
        attributeName: 'Employee',
        attributeDBName: 'employeeName',
        align: 'left'
    },
    {
        attributeName: 'Route',
        attributeDBName: 'routeName',
        align: 'left'
    },
    {
        attributeName: 'Market',
        attributeDBName: 'marketName',
        align: 'left'
    },
    {
        attributeName: 'Brand',
        attributeDBName: 'productName',
        align: 'left'
    },
    {
        attributeName: 'Taps',
        attributeDBName: 'taps',
        align: 'left'
    }
];

const transactionsTableAttributes= [
    {
        attributeName: 'Date',
        datetimeAttribute: true,
        attributeDBName: 'transactionDate',
        align: 'left'
    },
    {
        attributeName: 'Transaction ID',
        attributeDBName: 'transactionID',
        align: 'left'
    },
    {
        attributeName: 'Market',
        attributeDBName: 'marketName',
        align: 'left'
    },
    {
        attributeName: 'Brand',
        attributeDBName: 'productName',
        align: 'left'
    },
    {
        attributeName: 'Taps',
        attributeDBName: 'taps',
        align: 'left'
    }
];


const transactionsAttributesForAccount = [
    {
        attributeName: 'CleaningDate',
        datetimeAttribute: true,
        attributeDBName: 'transactionDate',
        align: 'left'
    },
    {
        attributeName: 'ID',
        attributeDBName: 'transactionID',
        align: 'left'
    },
    {
        attributeName: 'Employee',
        attributeDBName: 'employeeName',
        align: 'left'
    },
    {
        attributeName: 'Route',
        attributeDBName: 'routeName',
        align: 'left'
    },
    {
        attributeName: 'Market',
        attributeDBName: 'marketName',
        align: 'left'
    },
    {
        attributeName: 'Num Taps',
        attributeDBName: 'taps',
        align: 'left'
    }
];

const transactionsAttributesForRoute = [
    {
        attributeName: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        attributeName: 'Employee',
        attributeDBName: 'employeeName',
        align: 'left'
    },
    {
        attributeName: 'Route',
        attributeDBName: 'routeName',
        align: 'left'
    }
];

const transactionsAttributesForSummary = [
    {
        attributeName: 'Cycle',
        attributeDBName: 'cycleID',
        align: 'left'
    },
    {
        attributeName: 'Start Date',
        attributeDBName: 'startDate',
        dateAttribute: true,
        align: 'left'
    },
    {
        attributeName: 'End Date',
        attributeDBName: 'endDate',
        dateAttribute: true,
        align: 'left'
    },
    {
        attributeName: 'Num Accounts',
        attributeDBName: 'numDistinctAccounts',
        align: 'left'
    },
    {
        attributeName: 'Num Brands',
        attributeDBName: 'numDistinctBrands',
        align: 'left'
    },
    {
        attributeName: 'Num Taps',
        attributeDBName: 'taps',
        align: 'left'
    },
    {
        attributeName: 'Num Employees',
        attributeDBName: 'numDistinctEmployees',
        align: 'left'
    }
];

const transactionsAttributesForSummary_v2 = [
    {
        label: 'Cycle',
        key: 'cycleID',
        numeric: true,
    },
    {
        label: 'Start Date',
        key: 'startDate',
        isDate: true,
        formatDate: (date) => dateToDateString(date)
    },
    {
        label: 'End Date',
        key: 'endDate',
        isDate: true,
        formatDate: (date) => dateToDateString(date)
    },
    {
        label: 'Accounts',
        key: 'numDistinctAccounts',
        numeric: true

    },
    {
        label: 'Brands',
        key: 'numDistinctBrands',
        numeric: true

    },
    {
        label: 'Taps',
        key: 'taps',
        numeric: true

    },
    {
        label: 'Employees',
        key: 'numDistinctEmployees',
        numeric: true
    }
];


export  {transactionsAttributesForSingleBrand,
            transactionsTableAttributes,
            transactionsAttributesForAccount,
            transactionsAttributesForRoute,
            transactionsAttributesForSummary,
            transactionsAttributesForSummary_v2,
        };

