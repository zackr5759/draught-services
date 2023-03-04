const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class MarketsController {
    constructor() {
        console.log('Constructor of MarketsController is called.');
    }


    async countMarkets(ctx) {
        console.log('countMarkets called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT COUNT(distinct marketID) as num
                        FROM markets
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MarketsController::countMarkets", error);
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

    async allMarkets(ctx) {
        console.log('markets all markets called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            markets
                        ORDER BY marketName
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MarketsController::allMarket", error);
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

    async allMarketsSummary(ctx) {
        console.log('markets all markets summary called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT marketName, m.marketID, city, state, m.dateCreated, 
                              count(distinct r.routeID) numDistinctRoutes,
                              count(distinct a.accountID) numDistinctAccounts    
                        FROM 
                            markets m,
                            accounts a,
                            routes r
                        WHERE
                            m.marketID = r.marketID AND
                            r.routeID = a.routeID AND
                            m.status = 'Active'
                        GROUP BY marketName, m.marketID, city, state, m.dateCreated
                        ORDER BY marketName
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MarketsController::allMarketsSummary", error);
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

module.exports = MarketsController;
