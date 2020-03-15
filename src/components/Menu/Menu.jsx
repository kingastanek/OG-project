import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import strings from 'config/strings';
import {
  List,
  ListItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./Menu.style.";

class Menu extends Component {
  render() {
    const { classes } = this.props;
    const { OVERVIEW, BUILDINGS, RESEARCH } = strings;
    const links = [
      { name: OVERVIEW, linksTo: '/main' },
      { name: BUILDINGS, linksTo: '/buildings' },
      { name: RESEARCH, linksTo: '/research' }
    ];
    return (
      <List className={classes.list}>
        {links.map((link, index) => (
          <ListItem key={link.name || index} className={classes.listItem}>
            <NavLink activeClassName={classes.activeLink} to={link.linksTo} className={classes.linksText}>{link.name}</NavLink>
          </ListItem>
        ))}
      </List>
    )
  };
}

export default withStyles(styles)(Menu);
