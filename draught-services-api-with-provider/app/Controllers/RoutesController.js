const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

async function currentCycleID() {

    const query = `SELECT max(cycleID) cycleID from cycles;`;

    return new Promise( (resolve, reject) => {
        dbConnection.query(
            query, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::    async currentCycleID()\n", error);
                    reject(error);
                }
                console.log(`currentCycleID returns ${JSON.stringify(tuples)}`);
                resolve(tuples[0]['cycleID']);
            }
        );

    }).catch(error =>  console.log(`currentCycleID fails with error message ${error}`) );
}


class RoutesController {
    constructor() {
        console.log('Constructor of Ro0utesController is called.');
    }

    async countRoutes(ctx) {
        console.log('countRoutes called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT COUNT(distinct routeID) as num
                        FROM routes
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::countRoutes", error);
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

    async countProducts(ctx) {
        console.log('countProducts called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT COUNT(distinct productID) as num
                        FROM products
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::countProducts", error);
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


    async allRoutes(ctx) {
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

    async allRoutesSummary(ctx) {
        console.log(`routes all routes summary called.`);
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT routeName, r.routeID, e.employeeName, r.marketID,
                              count(distinct accountID) numDistinctAccounts, r.dateCreated 
                        FROM 
                            routes r left join employees e
                            on(r.employeeID = e.employeeID), accounts a                            
                        WHERE r.routeID = a.routeID AND e.status = 'Active' AND r.status = 'Active' AND a.status = 'Active'
                        GROUP BY routeName, r.routeID, e.employeeName
                        ORDER BY routeName
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::allRoutesSummary", error);
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

    async routeWithRouteID(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            routes
                        WHERE 
                            routeID = ?
                        ORDER BY routeName
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.routeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::routeWithRouteID", error);
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


    async insertNewRoute(ctx) {
        // Attempts to inserts the values in ctx.request.body into the routes table.

        const routesTableAttributes = [
            'routeID',
            'routeName',
            'employeeID',
            'marketID',
            'cycleID',
            'status',
            'lastModified',
            'dateCreated'
        ];


        let valuesFromRequest = JSON.parse(JSON.stringify(ctx.request.body)); // make a deep copy of ctx.request.body

        // Pad the values that we received through the request with the default values.
        const valuesToInsert = {
            ...valuesFromRequest,
            ...{        // default values
                status: valuesFromRequest.hasOwnProperty('status') ? valuesFromRequest['status'] : 'Active',
                routeID: valuesFromRequest.hasOwnProperty('routeID') ? valuesFromRequest['routeID'] : null,
                cycleID: await currentCycleID(),
                lastModified: new Date(),
                dateCreated: valuesFromRequest.hasOwnProperty('dateCreated') ? valuesFromRequest['dateCreated'] : new Date()
            }
        };

        const valueMarkers = Array(routesTableAttributes.length).fill('?').join(', ');

        // insert into tableName (a list of attributes) value(a list of values);

        // valueMarkers now contains eight (routesTableAttributes.length) question marks like so: '?, ?, ?, ?, ?, ?, ?, ?';
        const attributeValuesArray = routesTableAttributes.reduce( (valuesAssembled, attribute) => {
            valuesAssembled.push(valuesToInsert[attribute]);
            return valuesAssembled;
        }, []);

        // attributeValuesArray also has routesTableAttributes.length element. Its element i contains
        // values[ routeTableAttributes[i] ]. For example, attributeValuesArray[5] contains 'Active'

        return new Promise((resolve, reject) => {
            console.log(`API server::insertNewRoute: ${JSON.stringify(ctx.request.body)}`);
            console.log(`API server::insertNewRoute after having added default values: ${JSON.stringify(valuesToInsert)}`);

            const query = `
                       INSERT INTO routes (${routesTableAttributes}) 
                              VALUES (${valueMarkers})
                        `;
            dbConnection.query({
                sql: query,
                values: attributeValuesArray
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::routeWithRouteID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });


        })
            .catch(error => console.log(`insertNewRoute failed with error message, ${error}`));
    }
}

module.exports = RoutesController;
