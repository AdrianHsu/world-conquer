
import React, { Component } from "react";
import axios from 'axios';
import SimpleDialogWrapped from './dialog.js';
import Typography from '@material-ui/core/Typography';
import chroma from "chroma-js"
import { scaleLinear } from "d3-scale"

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import { Button } from "@material-ui/core";
const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}
const popScale = scaleLinear()
  .domain([0,100000000,1400000000])
  .range(["#CFD8DC","#607D8B","#37474F"])

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

const mapColors= ['#FF0000', '#FFA500', '#FFFF00', '#7CFC00', 'ECEFF1']; //Red, Orange, Yellow, Green, Default


class ZoomPan extends Component {
  constructor() {
    super()
    this.state = {
      center: [0,20],
      zoom: 1,
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
      selectedValue: DefaultGeo2.name,
      geo: DefaultGeo2,
      color: mapColors[3],
      mycolor: Array(241).fill("ECEFF1"),
      changeColor: false,
    }
    this.handleCitySelection = this.handleCitySelection.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.change = this.change.bind(this);
  }

  handleClickOpen = geo => {
    // this.setState({
    //   open: true,
    //   selectedValue: geo.properties.name,
    //   geo: geo,
    // });
    var self = this;
    axios.post('/getData', {
        id: geo.properties.adm0_a3,
      })
      .then(function (response) {
        console.log(response);
        if(response.data === 'error'){
          alert('error');
          hashHistory.push('/');
        }
        else{
          console.log('res is: ', response.data);
          self.setState({
            geo: response.data, 
            selectedValue: response.data.name,
            open: true,
            changeColor: true,
          });
        } 
      })
      .catch(function (error) {
        console.log('error is ',error);
      });      
    console.log(geo);
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };
  
  handleCitySelection(evt) {
    const cityId = evt.target.getAttribute("data-city")
    const city = this.state.cities[cityId]
    this.setState({
      center: city.coordinates,
      zoom: 2,
      changeColor: true,
    })
  }
  handleReset() {
    this.setState({
      center: [0,20],
      zoom: 1,
      changeColor: false,
    })
  }
  statuscallback = index => {
    console.log('map:', index);
    this.setState({
      color: mapColors[index],
      changeColor: false,
    })
  }
  change(){
    this.setState({ changeColor: true });
  }
  render() {
    return (
      <div>
        <div>
          <Button onClick={() => this.change()} color = 'primary'> change</Button> 
        </div>
        <div style={wrapperStyles}>
          {
            this.state.cities.map((city, i) => (
              <button
                key={i}
                className="btn px1"
                data-city={i}
                onClick={this.handleCitySelection}
                >
                { city.name }
              </button>
            ))
          }
          <button onClick={this.handleReset}>
            { "Reset" }
          </button>
        </div>
        <div>
        <Typography variant="subheading">Selected: {this.state.selectedValue}</Typography>
        <br />
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
          geo = {this.state.geo}
          statuscallback = {this.statuscallback}
        />
        </div>
        <div style={wrapperStyles}>
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
                    onClick = {() => this.handleClickOpen(geography)}
                    geography={geography}
                    projection={projection}
                    style={{
                        default: {
                          // fill: this.state.changeColor? 'FFFFFF' : popScale(geography.properties.pop_est),
                          fill: this.state.changeColor? 'FFFFFF' : this.state.mycolor[i],
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
                        stroke="#DF3702"
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

export default ZoomPan;
