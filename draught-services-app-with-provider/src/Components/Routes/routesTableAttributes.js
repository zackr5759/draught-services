
const routesTableAttributes = [
    {
        attributeName: 'Route Name',
        attributeDBName: 'routeName',
        align: 'left'
    },
    {
        attributeName: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        attributeName: 'Cycle ID',
        attributeDBName: 'cycleID',
        align: 'left'
    },
    {
        attributeName: 'Date Created',
        dateAttribute: true,
        attributeDBName: 'dateCreated',
        align: 'left'
    }
];

const routesSummaryTableAttributes = [
    {
        attributeName: 'Route Name',
        attributeDBName: 'routeName',
        align: 'left'
    },
    {
        attributeName: 'Employee',
        attributeDBName: 'employeeName',
        align: 'left'
    },
    {
        attributeName: 'Num Accounts',
        attributeDBName: 'numDistinctAccounts',
        align: 'left'
    },
    {
        attributeName: 'Date Created',
        dateAttribute: true,
        attributeDBName: 'dateCreated',
        align: 'left'
    }
];

export  {routesTableAttributes, routesSummaryTableAttributes};