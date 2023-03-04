import React, {useState, useEffect, Fragment} from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import API from "../../API_Interface/API_Interface";
import CancelAndSaveButton from './CancelAndSaveButtons';


import CustomTextField from './CustomTextField';
import CustomAutocomplete from './CustomAutocomplete';
import UserActionDialog from './UserActionDialog';
// import {BufferConstructor as Buffer} from "node/buffer";


const CreateRoute = (props) => {

    const [routes, setRoutes] = useState(null);
    const [markets, setMarkets] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [retrieveRoutes, setRetrieveRoutes] = useState(false);

    const [inputMarket, setInputMarket] = useState(null);
    const [inputRouteName, setInputRouteName] = useState('');
    const [inputEmployee, setInputEmployee] = useState(null);
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');

    // const [reportErrorToUser, setReportErrorToUser] = useState({});
    const [getUserConfirmation, setGetUserConfirmation] = useState(false);

    // const duplicateRouteName = false;

    // console.log(`input routeName at the top of the component is ${inputRouteName}`);
    // console.log(`input marketValue at the top of the component is ${JSON.stringify(inputMarket)}`);
    // console.log(`input employeeValue at the top of the component is ${JSON.stringify(inputEmployee)}`);


    const fieldAttributes = {
        ui_attributes: {
            notAnInputAttribute: true,
            width: '30ch',
        },

        route_name: {
            requiredAttribute: true,
            label: "Route name",
            errors: {
                noValueProvided: "Please provide a value for this field as it is a required attribute.",
                duplicateName: (userProvidedValue => `Route names should be unique. Your input, '${userProvidedValue}', is already in use. Try again.`)
            },
            userProvidedValue: inputRouteName,
            status: () => verifyRouteName()
        },
        market: {
            requiredAttribute: true,
            label: "Market",
            errors: {
                noValueProvided: "Please provide a value for this field as it is a required attribute.",
            },
            userProvidedValue: inputMarket?.marketName,
            status: () => verifyMarket()
        },
        employee: {
            requiredAttribute: false,
            label: "Employee",
            userProvidedValue: inputEmployee?.employeeName,
            status: () => verifyEmployee()

        },
        phone_number: {
            requiredAttribute: false,
            label: "Phone number",
            errors: {
                malformedPhoneNumber: (n) => `Your phone number entry, '${n}' does not match this format: 000-000-0000`
            },
            userProvidedValue: inputPhoneNumber,
            status: () =>  verifyPhoneNumber()
        },
    };

    const verifyUserInput = () => {
       const verificationObjects = Object.keys(fieldAttributes).filter(key => ! fieldAttributes[key].notAnInputAttribute )
            .map(key => {
           console.log(`verifyUserInput: key = ${key}`);
           const error = fieldAttributes[key].status();
           return {
               error: error.error,
               errorMsg: error.errorMsg,
               label: fieldAttributes[key].label,
               userProvidedValue: fieldAttributes[key].userProvidedValue
            }
       });

       return verificationObjects;
    };

    const verifyRouteName = () => {
        if( inputRouteName.trim().length === 0)
            return fieldAttributes.route_name.errors.noValueProvided;
        const routeWithTheSameName = routes.filter(route => route.routeName === inputRouteName.trim());
        return {
            error: routeWithTheSameName.length > 0,
            errorMsg: fieldAttributes.route_name.errors.duplicateName(inputRouteName.trim())
        } ;
    };

    const verifyMarket = () => {
        return {
            error:inputMarket === null,
            errorMsg: fieldAttributes.market.errors.noValueProvided
        };
    };

    const verifyPhoneNumber = () => {
        return {
            error: inputPhoneNumber.length !== 0 && ! inputPhoneNumber.match(/\d\d\d-\d\d\d-\d\d\d\d/),
            errorMsg: fieldAttributes.phone_number.errors.malformedPhoneNumber(inputPhoneNumber)
        }
    };

    const verifyEmployee = () => {
        return {
            error: false,   // it is not a required attribute and its value, if not null, gets selected from a system-provided list.
            errorMsg: null
        }
    };

    useEffect(() => {
        if( ! retrieveRoutes && routes ) {
            setGetUserConfirmation(true);
            return;
        }

        if( ! retrieveRoutes )
            return;

        const api = new API();

        async function getRoutes() {
            const routesJSONString = await api.allRoutes();
            // console.log(`routes from the DB ${JSON.stringify(routesJSONString)}`);
            setRoutes(routesJSONString.data);
            setRetrieveRoutes(false);
        }

        getRoutes();
    }, [retrieveRoutes]);

    useEffect(() => {
        const api = new API();

        async function getMarkets() {
            const marketsJSONString = await api.allMarkets();
            // console.log(`markets from the DB ${JSON.stringify(marketsJSONString)}`);
            setMarkets(marketsJSONString.data);
        }

        getMarkets();
    }, []);

    useEffect(() => {
        const api = new API();

        async function getEmployees() {
            const employeessJSONString = await api.allEmployees();
            // console.log(`Employees from the DB ${JSON.stringify(employeessJSONString)}`);
            setEmployees(employeessJSONString.data);
        }

        getEmployees();
    }, []);

    const insertNewRouteInformation = () => {
        const api = new API();
        const resultOfInsert = api.insertNewRoute(
            {
                routeName: inputRouteName.trim(),
                marketID: inputMarket?.marketID,
                employeeID: inputEmployee?.employeeID,
                phoneNumber: inputPhoneNumber.trim().length > 0 ? inputPhoneNumber.trim() : null
            }
        ).catch(error => console.log(`Exception in addRoute: error is: ${error}`));
        console.log(`return from insertNewRoute: ${JSON.stringify(resultOfInsert)}`);
    };

    const cancelForm = () => {
        console.log('cancel form called.');
    };

    return (
        <Fragment>

            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <FormControl varianet="standard" >
                    <Stack spacing={2} >
                        <CustomTextField
                            width={fieldAttributes.ui_attributes.width}
                            label={fieldAttributes.route_name.label}
                            value={inputRouteName}
                            disabled={false}
                            onChange={changedValue => setInputRouteName(changedValue.trim())}
                            requiredAttribute={fieldAttributes.route_name.requiredAttribute}
                        />
                        <CustomAutocomplete
                            width={fieldAttributes.ui_attributes.width}
                            options={markets}
                            getOptionLabel={market => market.marketName}
                            onChange={market => setInputMarket(market)}
                            label={fieldAttributes.market.label}
                            requiredAttribute={fieldAttributes.market.requiredAttribute}
                        />
                        <CustomAutocomplete
                            width={fieldAttributes.ui_attributes.width}
                            options={employees}
                            getOptionLabel={employee => employee.employeeName}
                            onChange={employee => setInputEmployee(employee)}
                            label={fieldAttributes.employee.label}
                            requiredAttribute={fieldAttributes.employee.requiredAttribute}
                        />
                        <CustomTextField
                            width={fieldAttributes.ui_attributes.width}
                            label="Phone number -- 000-000-0000"
                            value={inputPhoneNumber}
                            onChange={changedValue => setInputPhoneNumber(changedValue.trim())}
                            requiredAttribute={fieldAttributes.phone_number.requiredAttribute}
                        />
                    </Stack>
                    <CancelAndSaveButton
                        width={fieldAttributes.ui_attributes.width}
                        cancelHandler={() => console.log('AddRoute::User cancelled the form.')}
                        saveHandler={() => setRetrieveRoutes(true)}
                    />

                </FormControl>
            </Box>
            {
                getUserConfirmation && <UserActionDialog  itemsToDisplay={verifyUserInput()}
                                                          handleOkay={() => setGetUserConfirmation(false)}
                                                          handleSaveInformation={() => {
                                                              setGetUserConfirmation(false);
                                                              insertNewRouteInformation();
                                                          }}
                                                          handleCancel={() => {
                                                              setGetUserConfirmation(false);
                                                              cancelForm()
                                                          }}

                />
            }
        </Fragment>
    )
};

export default CreateRoute;