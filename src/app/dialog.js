/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import CardMedia from '@material-ui/core/CardMedia';
import InsetListItem from './InsetListItem.js';
import { Grid } from '@material-ui/core';
import SimpleListMenu from './menu.js';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class SimpleDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: this.props.currentcolor,
      discard: false,
    }
    this.handleClose.bind(this);
    this.onEnter.bind(this);
  }
  // componentDidMount() {
  //   this.setState({ index: this.props.currentcolor });
  // }
  handleClose = (discard) => {
    this.props.onClose(this.props.selectedValue);
    this.props.statuscallback(discard? this.props.currentcolor : this.state.index);
    // this.setState({ index: this.props.currentcolor })
  };
  statuscallback = index => {
    console.log('dialog:', index);
    this.setState({index: index});
  }
  fetchListItems = () => {
    return (
      <div>
      <InsetListItem
        key="id"
        title={"代碼：" + this.props.geo.id}
      />
      <InsetListItem
        key="flag"
        title={"國旗：" + this.props.geo.flag}
      />
      <InsetListItem
        key="cap"
        title={"首都名稱：" + this.props.geo.capital[0]}
      />
      <InsetListItem
        key="reg"
        title={"地區：" + this.props.geo.region}
      />
      <InsetListItem
        key="lat"
        title={"經緯度：" + this.props.geo.latlng[1] + ", " + this.props.geo.latlng[0]}
      />
    </div>);
  }
  onEnter() {
    this.setState({ index: this.props.currentcolor });
  }
  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    var listItems = this.fetchListItems();
    return (
      <div>
        <Modal          
          open={this.props.open}
          onClose={() => this.handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableRestoreFocus
        >
        <Dialog          
          open={this.props.open}
          onClose={() => this.handleClose(false)}
          onEnter={() => this.onEnter()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <CardMedia
            className={classes.media}
            image={this.props.geo.image}
          />
          <DialogTitle id="alert-dialog-title">{this.props.geo.name}</DialogTitle>
          
          <DialogContent>
                <List>
                    {listItems}
                </List>
                <SimpleListMenu statuscallback={this.statuscallback} currentcolor={this.props.currentcolor}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(true)} color="secondary">
              取消
            </Button>
            <Button onClick={() => this.handleClose(false)} color="primary" autoFocus>
              確定
            </Button>
          </DialogActions>
        </Dialog>
        </Modal>
      </div>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);
export default SimpleDialogWrapped;