
import React, { useState, Fragment } from 'react';
import Login from './Login';
import App from './App';

import AddRoute from './Components/InputComponents/AddRoute';


import {CycleIDProvider} from './CycleID/CycleIDProvider';

const logout = (setUser) => {
    return () => {
        setUser(undefined);
    }
};

export default function Main() {

    const [user, setUser] = useState(undefined);

    return (
        <Fragment>
            {
                user !== undefined ? (
                    <CycleIDProvider>   // <App user={user} logoutAction={logout(setUser)} />

                    </CycleIDProvider>
                ) : (
                    <Login user={user} setUser={setUser} />
                )
            }
        </Fragment>
    )

}