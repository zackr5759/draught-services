const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class SummaryController {
    constructor() {
        console.log('Constructor of SummaryController is called.');
    }

    async summary(ctx) {
        console.log('routes all routes called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            routes
                        WHERE status = 'Active'
                        ORDER BY routeName
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::allRoutes", error);
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

module.exports = SummaryController;

