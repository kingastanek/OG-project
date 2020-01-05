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
  async componentDidMount() {
    const { getUserResources } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserResources(userId);
  }
  
  render() {
    const { classes, resources } = this.props;
    console.log("resources",resources);
    const resourcesList = [
      {
        name: 'metal',
        value: resources.metal,
      },
      {
        name: 'crystal',
        value: resources.cristal
      },
      {
        name: 'deuterium',
        value: resources.deuterium
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
        {resourcesList.map(resource => {
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
  resources: state.reducer.resources.resources,
});


const mapDispatchToProps = dispatch => ({
  getUserResources: userId => dispatch(getUserResources(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResourcesBar));
