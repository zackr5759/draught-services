const accountsTableAttributes = [
    {
        attributeName: 'Account Name',
        attributeDBName: 'accountName',
        align: 'left'
    },
    {
        attributeName: 'Account ID',
        attributeDBName: 'accountID',
        align: 'left'
    },
    {
        attributeName: 'Route',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        attributeName: 'Last Serviced',
        datetimeAttribute: true,
        attributeDBName: 'lastModified',
        align: 'left'
    }
];

const accountsSummaryAttributes = [
    {
        attributeName: 'Account Name',
        attributeDBName: 'accountName',
        align: 'left'
    },
    {
        attributeName: 'Account ID',
        attributeDBName: 'accountID',
        align: 'left'
    },
    {
        attributeName: 'Cycle',
        attributeDBName: 'cycleID',
        align: 'left'
    },
    {
        attributeName: 'Employee',
        attributeDBName: 'employeeName',
        align: 'left'
    },
    {
        attributeName: 'Service Date',
        datetimeAttribute: true,
        attributeDBName: 'serviceDate',
        align: 'left'
    },
    {
        attributeName: 'Num Brands',
        attributeDBName: 'numDistinctBrands',
        align: 'left'
    },
    {
        attributeName: 'Taps',
        attributeDBName: 'taps',
        align: 'left'
    },

];


export {accountsTableAttributes, accountsSummaryAttributes}