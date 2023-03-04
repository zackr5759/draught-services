import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    // Uncomment the following line if the API server runs on the same host as your UI server.
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;

    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async countAccounts() {
        return axiosAgent.get(`/accounts/countAccounts`);
    }

    async countEmployees() {
        return axiosAgent.get(`/employees/countEmployees`);
    }

    async countProducts() {
        return axiosAgent.get(`/routes/countProducts`);
    }

    async countRoutes() {
        return axiosAgent.get(`/routes/countRoutes`);
    }

    async countTransactions() {
        return axiosAgent.get(`/transactions/countTransactions`);
    }

    async countMarkets() {
        return axiosAgent.get(`/markets/countMarkets`);
    }

    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }

    async allRoutesSummary(cycleID) {
        return axiosAgent.get(`routes/${cycleID}/all-routes-summary`);
    }

    async routesWithID(routeID) {
        return axiosAgent.get(`routes/${routeID}`);
    }

    async allAccounts(routeID) {
        console.log(`allAccounts`);
        return axiosAgent.get(`accounts/allAccounts`);
    }

    async accountsForRoute(routeID) {
        console.log(`accountsForRoute routeID = ${routeID}`);
        return axiosAgent.get(`accounts/${routeID}/route-accounts`);
    }

    async accountsForMarket(marketID) {
        console.log(`accountsForMarket marketID = ${marketID}`);
        return axiosAgent.get(`accounts/${marketID}/market-accounts`);
    }

    async accountsSummaryForRoute(cycleID, routeID) {
        console.log(`accountsForRoute routeID = ${routeID} cycleID = ${cycleID}`);
        return axiosAgent.get(`accounts/${cycleID}/${routeID}/route-accounts-summary`);
    }

    async getCycleIDs(howMany) {
        return axiosAgent.get(`cycles/${howMany}/cycleIDs`);
    }

    async transactionsForCycleWithID(cycleID) {
        console.log(`transactionsForCycleWithID ${JSON.stringify(cycleID)}`);
        return axiosAgent.get(`transactions/${cycleID}/for-cycle-with-id`);
    }

    async transactionsForRouteInCycle(routeID, cycleID) {
        console.log(`transactionsForRouteInCycle:: transactions/${routeID}/${cycleID}/route-in-cycle`);
        return axiosAgent.get(`transactions/${routeID}/${cycleID}/route-in-cycle`)

    }

    async transactionsForMarketInCycle(marketID, cycleID) {
        console.log(`transactionsForRouteInCycle:: transactions/${marketID}/${cycleID}/market-in-cycle`);
        return axiosAgent.get(`transactions/${marketID}/${cycleID}/market-in-cycle`)

    }

    async transactionsForAccountInCycle(accountID, cycleID) {
        return axiosAgent.get(`transactions/${accountID}/${cycleID}/account-in-cycle`);
    }

    async transactionsForEmployeeInCycle(employeeID, cycleID) {
        return axiosAgent.get(`transactions/${employeeID}/${cycleID}/employee-in-cycle`);

    }

    async transactionsAttributesForSummary(numCycles) {
        return axiosAgent.get(`transactions/${numCycles}/summary-for-cycles`);
    }

    async allMarkets() {
        return axiosAgent.get(`markets/all-markets`);
    }

    async allMarketsSummary() {
        return axiosAgent.get(`markets/all-markets-summary`);
    }

    async allEmployees() {
        return axiosAgent.get(`employees/all-employees`);
    }

    async insertNewRoute(routeDictionary) {
        console.log(`API_Interface::insertNewRoute: routeDictionary contains: ${JSON.stringify(routeDictionary )}`);
        return axiosAgent.post(`routes/insert-route`, routeDictionary);
    }
}