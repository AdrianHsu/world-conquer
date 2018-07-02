import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import HomeIcon from '@material-ui/icons/Home';
import FlightIcon from '@material-ui/icons/Flight';
import TravelIcon from '@material-ui/icons/LocalSee';
import StarIcon from '@material-ui/icons/Star';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});
const icons = [
    <HomeIcon />,
    <TravelIcon/>,
    <FlightIcon/>,
    <StarIcon/>,
    <CancelIcon/>
  ]
  
const options = [
  {title: 'I live in this country', icon: icons[0]},
  {title: 'I have visited this country', icon: icons[1]}, 
  {title: 'I have transfered in this country', icon: icons[2]}, 
  {title: 'I would like to visit this country', icon: icons[3]},
  {title: 'None', icon: icons[4]}
];

class SimpleListMenu extends React.Component {
  button = null;

  state = {
    anchorEl: null,
    selectedIndex: 0,
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
    // console.log('menu:', index);
    this.props.statuscallback(index);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Please choose your level"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Please choose your level"
              secondary={options[this.state.selectedIndex].title}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        {options.map((option, index) => (            
            <MenuItem
              key={index}
              disabled={false}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
            <ListItemIcon className={classes.icon}>
               {option.icon}
            </ListItemIcon>
              {option.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

SimpleListMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleListMenu);

