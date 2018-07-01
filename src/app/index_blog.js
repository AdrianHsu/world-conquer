import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ZoomPan from './map.js';
import TEST from './test.js';

class WorldMap extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
  return (
    <div>
      <p>hello react</p>
      <ZoomPan/>
    </div>
    );
  }
}

export default WorldMap;

// render (<WorldMap />, document.getElementById('root'));