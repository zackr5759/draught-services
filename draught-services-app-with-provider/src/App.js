import {Fragment} from "react";
import MainDrawer from './menu/MainDrawer';

const makeUserName = ({user_fName, user_mName, user_lName}) => {
    return `${user_fName} ${user_mName === undefined ? '' : (user_mName+(user_mName.length === 1 ? '.' : user_mName))} ${user_lName}`;
};


export default function App({user, logoutAction}) {
    const mainPageTitle = "Draught Services";

    return (
        <Fragment>
                <MainDrawer title={mainPageTitle}
                            user={makeUserName(user)}
                            logoutAction={logoutAction}/>
        </Fragment>
    )

}

