import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

class InsetListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<ListItem divider >
      <ListItemIcon>
      <StarIcon />
      </ListItemIcon>
      <ListItemText inset primary={this.props.title}/>
      </ListItem>);
  }
};

export default InsetListItem;