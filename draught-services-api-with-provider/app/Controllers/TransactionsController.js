const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class TransactionsController {
    constructor() {
        console.log('Constructor of Transactions Controller is called.');
    }

    async transactionsForCycleID(ctx) {
        console.log('transactionsForCycleID is called: cycleID is ', JSON.stringify(ctx.params.cycleID));
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT transactionDate, transactionID, accountName, employeeName, routeName, marketName, productName, taps
                        FROM 
                            transactions t, accounts a, employees e, routes r, markets m, products p  
                        WHERE
                            t.accountID = a.accountID AND
                            t.employeeID = e.employeeID AND
                            t.routeID = r.routeID AND
                            t.marketID = m.marketID AND
                            t.productID = p.productID AND 
                            t.cycleID = ? 
                        ORDER BY transactionDate desc LIMIT 100
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.cycleID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionsForCycleID", error);
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

    async transactionsForRouteInCycle(ctx) {
        console.log(`transactionsForRouteInCycle is called: cycleID is ${ctx.params.cycleID} routeID is ${ctx.params.routeID}`);
        return new Promise((resolve, reject) => {
            const query = `
                    SELECT transactionDate, transactionID, marketName, productName, taps 
                        FROM transactions t 
                            INNER JOIN markets m ON t.marketID = m.marketID
                            INNER JOIN products p ON t.productID = p.productID
                            WHERE t.routeID = ? AND
                                  t.cycleID = ?
                            ORDER BY transactionDate                     
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.routeID, ctx.params.cycleID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionsForRouteInCycle", error);
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

    async transactionsForMarketInCycle(ctx) {
        console.log(`transactionsForMarketInCycle is called: cycleID is ${ctx.params.cycleID} marketID is ${ctx.params.marketID}`);
        return new Promise((resolve, reject) => {
            const query = `
                    SELECT transactionDate, transactionID, marketName, productName, taps 
                        FROM transactions t 
                            INNER JOIN markets m ON t.marketID = m.marketID
                            INNER JOIN products p ON t.productID = p.productID
                            WHERE m.marketID = ? AND
                                  t.cycleID = ?
                            ORDER BY transactionDate                     
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.marketID, ctx.params.cycleID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionsForRouteInCycle", error);
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

    async countTransactions(ctx) {
        console.log('countTransactions called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT COUNT(distinct transactionID) as num
                        FROM transactions
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionController::countTransactions", error);
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


    async transactionsForAccountInCycle(ctx) {
        console.log(`transactionsForAccountInCycle is called: cycleID is ${ctx.params.cycleID} accountID is ${ctx.params.accountID}`);
        return new Promise((resolve, reject) => {
            const query = `
            SELECT transactionDate, transactionID, employeeName, routeName, marketName, taps
            FROM 
                transactions t
            JOIN employees e ON t.employeeID = e.employeeID
            JOIN routes r ON t.routeID = r.routeID
            JOIN markets m ON t.marketID = m.marketID
            WHERE
                t.accountID = ? AND
                t.cycleID = ? 
            ORDER BY transactionDate desc
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.accountID, ctx.params.cycleID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionsForAccountInCycle", error);
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

    async transactionsForSummaryInCycles(ctx) {
        console.log(`transactionsForSummaryInCycles is called for ${ctx.params.numCycles} cycles`);
        return new Promise((resolve, reject) => {
            const query = `
                    SELECT t.cycleID, c.startDate, c.endDate, count(distinct accountID) as numDistinctAccounts,
                            count(distinct employeeID) as numDistinctEmployees,
                            count(distinct productID) as numDistinctBrands, sum(taps) as taps 
                    FROM 
                           transactions t, cycles c
                        WHERE
                            t.cycleID = c.cycleID
                        GROUP BY t.cycleID, c.startDate, c.endDate
                        ORDER BY t.cycleID 
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionsForSummaryInCycles", error);
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

module.exports = TransactionsController;
