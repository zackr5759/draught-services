const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class EmployeeController {
    constructor() {
        console.log('Constructor of EmployeeController is called.');
    }


    async countEmployees(ctx) {
        console.log('countEmployees called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT COUNT(distinct employeeID) as num
                        FROM employees
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in EmployeeController::countEmployees", error);
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

    async allEmployees(ctx) {
        console.log('EmployeeController::allEmployees called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            employees
                        WHERE status = 'Active'
                        ORDER BY employeeName
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
}

module.exports = EmployeeController;

