

const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

const SummaryController = new (require('../app/Controllers/SummaryController.js'))();
const summaryRouter = require('koa-router')({
    prefix: '/summary'
});

summaryRouter.use(VerifyJWT)
summaryRouter.get('/summary', Authorize('admin'), SummaryController.summary)

const LoginController = new (require('../app/Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));

// Routes-related routes.

const RoutesController = new (require('../app/Controllers/RoutesController.js'))();
const routesRouter = require('koa-router')({
    prefix: '/routes'
});

routesRouter.use(VerifyJWT);
routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes);
routesRouter.get('/countRoutes', Authorize('admin'), RoutesController.countRoutes);
routesRouter.get('/countProducts', Authorize('admin'), RoutesController.countProducts);
routesRouter.get('/:cycleID/all-routes-summary', Authorize('admin'), RoutesController.allRoutesSummary);
routesRouter.get('/:routeID', Authorize('admin'), RoutesController.routeWithRouteID);
routesRouter.post('/insert-route', Authorize('admin'), RoutesController.insertNewRoute);

// Accounts-related routes.

const AccountsController = new (require('../app/Controllers/AccountsController.js'))();
const accountsRouter = require('koa-router')({
    prefix: '/accounts'
});
accountsRouter.use(VerifyJWT);
accountsRouter.get('/countAccounts', Authorize('admin'), AccountsController.countAccounts);
accountsRouter.get('/allAccounts', Authorize('admin'), AccountsController.allAccounts);
accountsRouter.get('/:routeID/route-accounts', Authorize('admin'), AccountsController.accountsForRoute);
accountsRouter.get('/:marketID/market-accounts', Authorize('admin'), AccountsController.accountsForMarket);
accountsRouter.get('/:cycleID/:routeID/route-accounts-summary', Authorize('admin'), AccountsController.accountsSummaryForRoute);

//         return axiosAgent.get(`accounts/${routeID}/route-accounts-summary`);

// CycleID-related routes.

const CycleIDController = new (require('../app/Controllers/CycleIDs.js'))();
const cycleIDRouter = require('koa-router')({
    prefix: '/cycles'
});

cycleIDRouter.use(VerifyJWT);
cycleIDRouter.get('/:numCycleIDs/cycleIDs', Authorize('admin'), CycleIDController.cycleIDInfoForNCycles);

// Transactions-related routes

const TransactionsController = new (require('../app/Controllers/TransactionsController.js'))();
const transactionsRouter = require('koa-router')({
    prefix: '/transactions'
});

transactionsRouter.use(VerifyJWT);
transactionsRouter.get('/countTransactions', Authorize('admin'), TransactionsController.countTransactions);
transactionsRouter.get('/:cycleID/for-cycle-with-id', Authorize('admin'), TransactionsController.transactionsForCycleID);
transactionsRouter.get('/:routeID/:cycleID/route-in-cycle', Authorize('admin'), TransactionsController.transactionsForRouteInCycle);
transactionsRouter.get('/:marketID/:cycleID/market-in-cycle', Authorize('admin'), TransactionsController.transactionsForMarketInCycle);
transactionsRouter.get('/:accountID/:cycleID/account-in-cycle', Authorize('admin'), TransactionsController.transactionsForAccountInCycle);
transactionsRouter.get('/:numCycles/summary-for-cycles', Authorize('admin'), TransactionsController.transactionsForSummaryInCycles);

// Markets-related routes

const MarketsController = new (require('../app/Controllers/MarketsController.js'))();
const marketsRouter = require('koa-router')({
    prefix: '/markets'
});

marketsRouter.use(VerifyJWT);
marketsRouter.get('/all-markets', Authorize('admin'), MarketsController.allMarkets);
marketsRouter.get('/countMarkets', Authorize('admin'), MarketsController.countMarkets);
marketsRouter.get('/all-markets-summary', Authorize('admin'),
    MarketsController.allMarketsSummary);

// Employees-related routes

const EmployeeController = new (require('../app/Controllers/EmployeeController.js'))();
const employeesRouter = require('koa-router')({
    prefix: '/employees'
});

employeesRouter.use(VerifyJWT);
employeesRouter.get('/all-employees', Authorize('admin'), EmployeeController.allEmployees);
employeesRouter.get('/countEmployees', Authorize('admin'), EmployeeController.countEmployees);


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    routesRouter.routes(),
    accountsRouter.routes(),
    cycleIDRouter.routes(),
    transactionsRouter.routes(),
    marketsRouter.routes(),
    employeesRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
