const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class CycleIDs {
    constructor() {
        console.log('Constructor of CycleIDs is called.');
    }

    async cycleIDInfoForNCycles(ctx) {
        console.log('cycleIDInfoForNCycles is called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            cycles
                        ORDER BY cycleID desc limit ?
                        `;
            dbConnection.query({
                sql: query,
                values: [Number(ctx.params.numCycleIDs)]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in CycleIDs::cycleIDInfoForNCycles", error);
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

module.exports = CycleIDs;
