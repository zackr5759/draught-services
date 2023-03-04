import React, {Fragment} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListSubheader from '@mui/material/ListSubheader';

import {MenuRoutes} from './RouterRoutes';
import {MenuListItems} from "./MainMenu";
import makeKey from '../utils/keyGenerator';

import {presentationComponents}  from './MenuPresentationComponents';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    ({theme, open}) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const TopBar = ({open, handleDrawerOpen, title, user, logoutAction}) => {
    // This component is responsible for rendering the Toolbar that is drawn
    // at the top of the drawer.

    return (
        <Fragment>
            <AppBar position="fixed" open={open} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                    <Box width="100%" justifyContent="center" flex={1}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            {user}
                        </Typography>
                    </Box>
                    <Box width="40" justifyContent="right" flex={1}>
                        <Typography variant="h7" noWrap component="div" align="right" onClick={() => logoutAction()}>
                            Logout
                        </Typography>
                    </Box>

                </Toolbar>
            </AppBar>
        </Fragment>
    )
};


export default function MainDrawer({title, user, logoutAction}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    console.log('in MainDrawer');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar title={title} open={open} handleDrawerOpen={handleDrawerOpen} user={user} logoutAction={logoutAction} />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    dense
                    aria-labelledby="nested-list-subheader"
                    key={makeKey()}
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            View Components
                        </ListSubheader>
                    }
                >
                    <MenuListItems menuItems={presentationComponents()} pathPrefix="" key={makeKey()} />
                </List>

            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <MenuRoutes />
            </Main>
        </Box>
    );
}
