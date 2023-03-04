const marketSummaryAttributes = [
    {
        attributeName: 'MarketName',
        attributeDBName: 'marketName',
        align: 'left'
    },
    {
        attributeName: 'City',
        attributeDBName: 'city',
        align: 'left'
    },
    {
        attributeName: 'State',
        attributeDBName: 'state',
        align: 'left'
    },
    {
        attributeName: 'Num Routes',
        attributeDBName: 'numDistinctRoutes',
        align: 'left'
    },
    {
        attributeName: 'Num Accounts',
        attributeDBName: 'numDistinctAccounts',
        align: 'left'
    },
    {
        attributeName: 'Date Created',
        attributeDBName: 'dateCreated',
        dateAttribute: true,
        align: 'left'
    },
];

export {marketSummaryAttributes}