import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { getUserResources } from 'store/actions/resources';
import styles from "./ResourcesBar.style.";

class ResourcesBar extends Component {
  // async componentDidMount() {
  //   const { getUserResources, user: { user_id } } = this.props;
  //   await getUserResources(user_id);
  // }
  
  render() {
    const { classes } = this.props;
    const resources = [
      {
        name: 'metal',
        value: 500,
      },
      {
        name: 'crystal',
        value: 1200,
      },
      {
        name: 'deuterium',
        value: 250,
      },
      {
        name: 'darkMatter',
        value: 0,
      },
      {
        name: 'energy',
        value: 0,
      },
    ];
    return (
      <List className={classes.list}>
        {resources.map(resource => {
          return (
            <ListItem key={resource.name} className={classes.listItem}>
              <ListItemIcon>
                <div className={classes[resource.name]} />
              </ListItemIcon>
              <Typography className={classes.resourceText}>{resource.value}</Typography>
            </ListItem>
          )}
        )}
      </List>
    )
  };
}

const mapStateToProps = state => ({
  user: state.reducer.userConfig.user,
  resources: state.reducer.resources.resources,
});


const mapDispatchToProps = dispatch => ({
  getUserResources: userId => dispatch(getUserResources(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResourcesBar));
