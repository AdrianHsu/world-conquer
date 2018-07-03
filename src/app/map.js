
import React, { Component } from "react";
import axios from 'axios';
import SimpleDialogWrapped from './dialog.js';
import Typography from '@material-ui/core/Typography';
import { scaleLinear } from "d3-scale"
import ButtonAppBar from './ButtonAppBar.js';
import { Button } from "@material-ui/core";
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FileSaver from 'file-saver';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const DefaultGeo2 =  {
    "flag": "🇹🇼",
    "name": "Taiwan",
    "capital": [
      "Taipei"
    ],
    "region": "Asia",
    "latlng": [
      23.5,
      121
    ],
    "id": "TWN"
}

const mapColors= ['#FF6984', '#FFC964', '#FFEE00', '#91D143', 'ECEFF1']; //Red, Orange, Yellow, Green, Default


class ZoomPan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'None',
      center: [0,20],
      zoom: 1,
      title: "初心者",
      cities: [
        { name: "蘇黎世", coordinates: [8.5417,47.3769] },
        { name: "新加坡", coordinates: [103.8198,1.3521] },
        { name: "舊金山", coordinates: [-122.4194,37.7749] },
        { name: "雪梨", coordinates: [151.2093,-33.8688] },
        { name: "波士頓", coordinates: [-71.081797, 42.322620]},
        { name: "布宜諾斯艾利斯", coordinates: [-58.3816,-34.6037] },
        // { name: "上海", coordinates: [121.4737,31.2304] },
        { name: "台灣", coordinates: [121.2, 23.5] },
        { name: "喀布爾", coordinates: [69.0958, 34.3159]},
        { name: "莫斯科", coordinates: [37.637191, 55.697636]},
        { name: "開普敦", coordinates: [18.466378, -33.996285]},
      ],
      open:false,
      originalno: 0,
      selectedValue: DefaultGeo2.name,
      selectedCode: DefaultGeo2.id,
      geo: DefaultGeo2,
      color: mapColors[3],
      mycolor: Array(241).fill(4),
      changeColor: false,
      score: 0,
      currentcolor: 4,
    }
    this.handleCitySelection = this.handleCitySelection.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.screenshot = this.screenshot.bind(this)
  }
  componentDidMount(){
    var retrievedObject = sessionStorage.getItem('userInfo');
    if(retrievedObject == null) {
      window.alert('你沒有登入哦！');
      this.props.history.push('/login');
    }
    // window.alert(retrievedObject + '\n登入成功！');
    // console.log(retrievedObject);
    retrievedObject = JSON.parse(retrievedObject);
    var username = retrievedObject.username;
    document.title = "世界制霸 | " + username;
    // console.log(username);
    axios.get('/load', {
      params: {
        username: username
      }
    })
    .then( (res) => {
      // console.log(res['data']);
      var mycolor = this.state.mycolor;
      var score = 0;
      for(let i = 0; i < res.data.length; ++i){
        mycolor[res.data[i].no] = parseInt(res.data[i].level);
      }
      for(let j = 0; j < mycolor.length; ++j){
        score += 4-mycolor[j];
      }
      
      var title = "初心者";
      if(score >= 3) {
        title = "超級初心者"
      } else if (score >= 10) {
        title = "魔導士"
      } else if (score >= 20) {
        title = "大魔導士"
      } else if (score >= 30) {
        title = "卍罪 i 大魔導士卍"
      } else if (score >= 50) {
        title = "真＊土豪"
      }
      this.setState({username: username, mycolor: mycolor, score: score, title: title});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleClickOpen = (geo, i) => {
    console.log('click');
    var self = this;
    axios.post('/getData', {
        id: geo.properties.adm0_a3,
      })
      .then(function (response) {
        // console.log(response);
        if(response.data === 'error'){
          alert('error');
          hashHistory.push('/');
        }
        else{
          console.log('res is: ', response.data);
          var currentcolor = self.state.mycolor[i];
          self.setState({
            geo: response.data,
            originalno: i,
            selectedValue: response.data.name,
            selectedCode: response.data.id,
            currentcolor: currentcolor,
            open: true,
          });
        } 
      })
      .catch(function (error) {
        console.log('error is ',error);
      });      
    // console.log(geo);
  };

  handleClose = value => {
    this.setState({ selectedValue: "", selectedCode: "", open: false});
  };
  
  handleCitySelection(i) {
    // const cityId = evt.target.getAttribute("data-city")
    const cityId = i
    const city = this.state.cities[cityId]
    this.setState({
      center: city.coordinates,
      zoom: 2,
    })
  }
  handleReset() {
    this.setState({
      center: [0,20],
      zoom: 1,
    })
  }
  statuscallback = index => {
    console.log('map:', index);
    var mycolor = this.state.mycolor;
    mycolor[this.state.originalno] = index;
    var score = this.state.score + ((4-index) - (4-this.state.currentcolor));
    // console.log(this.state.selectedCode);
    // console.log(this.state.selectedValue);
    // console.log(index);
    axios.put('/save', {
      username: this.state.username,
      id: this.state.selectedCode,
      level: index,
      no: this.state.originalno,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
    this.setState({
      color: mapColors[index],
      mycolor: mycolor,
      score: score,
    })
  }
  onenter () {
    console.log('will enter')
  }
  screenshot () {
    html2canvas(document.getElementById('map'))
      .then(function(canvas) {
        canvas.toBlob(function(blob) {
          FileSaver.saveAs(blob, "World-Conquer.jpg");
        },'image/jpeg', 1);    
      }
    );
  }
  render() {
    return (
      <div>
        <ButtonAppBar history={this.props.history} 
          username={this.state.username}
          score = {this.state.score}
          title = {this.state.title}>
        </ButtonAppBar>
        <div style={wrapperStyles}>
          {
            this.state.cities.map((city, i) => (
              <Button variant="outlined"
                key={i}
                className="btn px1"
                onClick={() => this.handleCitySelection(i)}
                style={{margin: 10}}
                >
                { city.name }
              </Button>
            ))
          }
          <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleReset}>
            { "Reset" }
          </Button>
          <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.screenshot}>
            { "ScreenShot" }
          </Button>
        </div>
        <div>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
          onenter={this.onenter}
          geo = {this.state.geo}
          statuscallback = {this.statuscallback}
          currentcolor = {this.state.currentcolor}
        />
        </div>
        <div style={wrapperStyles} id="map">
          <ComposableMap
            projectionConfig={{
              scale: 205,
            }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto",
              left: 0,
            }}
            >
            <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
              <Geographies geography="/world-50m-with-population.json" disableOptimization>
                {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                  <Geography
                    key={i}
                    onClick = {() => this.handleClickOpen(geography, i)}
                    geography={geography}
                    projection={projection}
                    style={{
                        default: {
                          fill: mapColors[this.state.mycolor[i]],
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#607D8B",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#FF5722",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                    }}
                  />
                  
                ) )}
              </Geographies>              
              <Markers>
                {
                  this.state.cities.map((city, i) => (
                    <Marker key={i} marker={city}>
                      <circle
                        cx={0}
                        cy={0}
                        r={6}
                        fill="#FF5722"
                        // fill = "A9A9A9"
                        stroke="#DF3702"
                        // stroke = '607D8B'
                      />
                    </Marker>
                  ))
                }
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    )
  }
}


export default (ZoomPan);
