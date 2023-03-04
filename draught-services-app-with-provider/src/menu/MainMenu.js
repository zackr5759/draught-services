import React, {Fragment, useState} from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Link as RouterLink, useRouteMatch} from "react-router-dom";


import PropTypes from "prop-types";

import Box from "@mui/material/Box";

const ListItemLink = (props) => {
    const { icon, primary, to, onClick } = props;
    const {expandable, expand} = props;

    const renderLink = React.useMemo(
        () => {
            console.log(`to contains ${to}`);
            return React.forwardRef(function Link(itemProps, ref) {
                return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
            })},
        [to],
    );

    return (
        <ListItem button component={renderLink} onClick={() => onClick(primary) } >
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} />
            {expandable ? (expand ?  <ExpandLess/> : <ExpandMore/>) : null}
        </ListItem>

    );
};

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

const  MakeSubMenu = (props) => {

    const [expand, setExpand] = useState(false);

    const {menuDescNode} = props;
    const {path: menuNodePath} = props.menuDescNode;
    const {selectedItemName, setSelectedItemName} = props;

    const makePath = (prefix, path) => {
        return prefix.length === 0 ? `/${path}` : `/${prefix}/${path}`;
    } ;

    const shouldWeUnExpand = () => expand && menuNodePath !== selectedItemName &&
        menuDescNode.subItems.filter(node => makePath(menuNodePath, node.path) === selectedItemName).length === 0;

    return <Fragment>
        <ListItemLink key={menuNodePath}
                      to={`/${menuDescNode.path}`}
                      primary={menuDescNode.title}
                      expandable={true}
                      expand={expand}
                      icon={selectedItemName === menuNodePath ? <ChevronRightIcon /> : null }
                      onClick={() => {
                          setSelectedItemName(menuNodePath);
                          setExpand(!expand)
                      }}
        />
        <Collapse in={expand} timeout="auto" unmountOnExit key={`${menuDescNode.path}-collapsed`}>
            <Box ml={3}>
                {
                    shouldWeUnExpand() && setExpand(false) ||
                    menuDescNode.subItems.map(menuItem => (
                            <ListItemLink key={makePath(menuNodePath, menuItem.path)}
                                          to={makePath(menuNodePath, menuItem.path)} primary={menuItem.title}
                                          onClick={() => setSelectedItemName(makePath(menuNodePath, menuItem.path))}
                                          icon={selectedItemName === makePath(menuNodePath, menuItem.path) ? <ChevronRightIcon /> : null } />
                        )
                    )
                }
            </Box>
        </Collapse>
    </Fragment>
};




const MenuListItems = ({menuItems, pathPrefix}) => {

    const match = useRouteMatch();

    console.log(`MenuListItems matched ${match}`);

    const [expand, setExpand] = useState(false);
    const [selectedItemName, setSelectedItemName] = useState('/summary');

    console.log(`selected item name is ${selectedItemName}`);

    const selectItem = (title) => {
        console.log(`clicked on '${title}' and selected item is '${selectedItemName}'`);
        setSelectedItemName(`${title}`);
    };

    const makePath = (prefix, path) => {
        return prefix.length === 0 ? `/${path}` : `/${prefix}/${path}`;
    } ;


    return menuItems.map((compDesc, idx) => {

        return compDesc['expandable'] ?
            <Fragment key={compDesc.path}>
                <MakeSubMenu  menuDescNode={compDesc} selectedItemName={selectedItemName} setSelectedItemName={setSelectedItemName} />
            </Fragment>
            :
            <Fragment key={compDesc.path}>
                <ListItemLink key={makePath(pathPrefix, compDesc.path)} to={makePath(pathPrefix, compDesc.path)} primary={compDesc.title}
                              onClick={() => selectItem(makePath(pathPrefix, compDesc.path))}
                              icon={selectedItemName === makePath(pathPrefix, compDesc.path) ? <ChevronRightIcon /> : null } />
            </Fragment>

    })
};

export {MenuListItems}
