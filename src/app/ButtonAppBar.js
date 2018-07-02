import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  appbar: {
    boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, .30)',
  }
};

class ButtonAppBar extends React.Component {

  constructor(props) {
    super(props);
  }
  redirectAuth(e) {
    e.preventDefault();

    sessionStorage.clear();
    this.props.history.push('/login');
  }
  loginButton = (e) => {
    if(this.props.username === '') {
      return(
        <Button onClick={e => this.redirectAuth(e)}>
        登入
      </Button>);
    } else {
      return(
        <Button onClick={e => this.redirectAuth(e)}>
        登出
      </Button>);
    }
  }
  titleBar = (classes) => {
    return (<Typography variant="title" color="inherit" className={classes.flex}>
    歡迎回來，{this.props.username}！
    </Typography>);
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit" className={classes.appbar}>
          <Toolbar>
            {this.titleBar(classes)}
            {this.loginButton()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);