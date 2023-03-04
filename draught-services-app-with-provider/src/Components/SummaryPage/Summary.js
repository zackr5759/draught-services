import React, {Fragment, useState, useEffect, useContext} from 'react';
import Table from '@material-ui/core/Table';
import API from '../../API_Interface/API_Interface';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Summary(props) {

    const [accounts, setaccounts] = useState([]);
    const [employees, setemployees] = useState([]);
    const [markets, setmarkets] = useState([]);
    const [products, setproducts] = useState([]);
    const [routes, setroutes] = useState([]);
    const [transactions, settransactions] = useState([]);


    useEffect(() => {

        const api = new API();

        async function getValues() {
            let JSONString = await api.countAccounts();
            setaccounts(JSONString.data);
            JSONString = await api.countEmployees();
            setemployees(JSONString.data);
            JSONString = await api.countMarkets();
            setmarkets(JSONString.data);
            JSONString = await api.countProducts();
            setproducts(JSONString.data);
            JSONString = await api.countRoutes();
            setroutes(JSONString.data);
            JSONString = await api.countTransactions();
            settransactions(JSONString.data);
        }
        getValues();
    }, []);


    return (
        <Fragment>
            <TableContainer component={Paper}>
            <Table className={"table"} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">#Accounts</TableCell>
                  <TableCell align="left">#Employees</TableCell>
                  <TableCell align="left">#Markets</TableCell>
                  <TableCell align="left">#Products</TableCell>
                  <TableCell align="left">#Routes</TableCell>
                  <TableCell align="left">#Transactions</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                    <TableRow>
                    {accounts.map(account => <TableCell align="left">{account.num}</TableCell>)}
                    {employees.map(employee => <TableCell align="left">{employee.num}</TableCell>)}
                    {markets.map(market => <TableCell align="left">{market.num}</TableCell>)}
                    {products.map(product => <TableCell align="left">{product.num}</TableCell>)}
                    {routes.map(route => <TableCell align="left">{route.num}</TableCell>)}
                    {transactions.map(transaction => <TableCell align="left">{transaction.num}</TableCell>)}
                </TableRow>
            </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
        )
}
