import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./Menu.style.";

class Menu extends Component {

  
  render() {
    const { classes } = this.props;
    const links = [
      {
        name: 'Overview',
        linksTo: '/main'
      },
      {
        name: 'Resources',
        linksTo: '/main'
      }
    ];
    return (
      <List className={classes.list}>
        {links.map(link => (
          <ListItem key={link.name} className={classes.listItem}>
            <Link to={link.linksTo} className={classes.linksText}>{link.name}</Link>
          </ListItem>
        ))}
      </List>
    )
  };
}

export default withStyles(styles)(Menu);
