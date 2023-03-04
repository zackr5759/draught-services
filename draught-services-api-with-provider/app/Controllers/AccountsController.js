const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class AccountsController {
    constructor() {
        console.log('Constructor of AccountsController is called.');
    }
    
    async countAccounts(ctx) {
        console.log('countAccounts called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT COUNT(distinct accountID) as num
                        FROM accounts
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::countAccounts", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async allAccounts(ctx) {
        console.log('all accounts called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            accounts
                        WHERE status = 'Active'
                        ORDER BY accountName
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::allAccounts", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async accountsForRoute(ctx) {
        console.log('accountsForRoute is called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            accounts
                        WHERE routeID = ? AND
                        status = 'Active'
                        ORDER BY accountName
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.routeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in AccountsController::accountsForRoute", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async accountsForMarket(ctx) {
        console.log('accountsForMarket is called with marketID:', ctx.params);
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            accounts
                        WHERE marketID = ? AND
                        status = 'Active'
                        ORDER BY accountName
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.marketID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in AccountsController::accountsForMarket", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async accountsSummaryForRoute(ctx) {
        console.log('accountsSummaryForRoute is called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT accountName, t.cycleID as cycleID, a.accountID, max(t.transactionDate) serviceDate, employeeName, 
                              count(distinct t.productID) numDistinctBrands, sum(taps) taps
                        FROM 
                            accounts a, transactions t, employees e   
                        WHERE t.cycleID = ? AND 
                              t.routeID = ? AND
                              t.accountID = a.accountID AND
                              t.employeeID = e.employeeID
                        GROUP BY accountName, accountID, employeeName
                        ORDER BY accountName
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.cycleID, ctx.params.routeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in AccountsController::accountsSummaryForRoute", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }


}

module.exports = AccountsController;
