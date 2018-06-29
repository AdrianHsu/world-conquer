import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import PaperSheet from './Papersheet.js';
import ZoomPan from './map.js';
import TEST from './test.js';

class World extends React.Component {
  render() {
      return(
          <p>hello world</p>
      );
  }
}


class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
  return (
    <div>
      <p>hello react</p>
      <Paper  elevation={10}>
        <Typography variant="headline" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
      <TEST/>
      <ZoomPan/>
    </div>
    );
  }
}

render (<App />, document.getElementById('root'));