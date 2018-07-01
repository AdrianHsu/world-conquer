
import React, { Component } from "react";
import axios from 'axios';
import SimpleDialogWrapped from './dialog.js';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
const DefaultGeo = {
    "type": "Feature",
    "id": "TWN",
    "properties": {
      "name": "Taiwan"
    },
    "geometry": {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [
            [
              121.63816381638162,
              25.2177475580214
            ],
            [
              121.998199819982,
              25.009365799061896
            ],
            [
              121.81818181818181,
              24.87044462642224
            ],
            [
              121.85418541854187,
              24.488411401663157
            ],
            [
              121.63816381638162,
              24.175838763223922
            ],
            [
              121.49414941494149,
              23.429137460285716
            ],
            [
              121.38613861386142,
              23.09919967526652
            ],
            [
              121.17011701170117,
              22.75189674366736
            ],
            [
              121.02610261026103,
              22.665071010767576
            ],
            [
              120.8820882088209,
              22.36986351890829
            ],
            [
              120.84608460846084,
              21.901004561249422
            ],
            [
              120.66606660666065,
              22.02256058730913
            ],
            [
              120.63006300630065,
              22.300402932588455
            ],
            [
              120.23402340234026,
              22.647705864187614
            ],
            [
              120.16201620162019,
              23.029739088946684
            ],
            [
              120.05400540054006,
              23.029739088946684
            ],
            [
              120.12601260126013,
              23.29021628764606
            ],
            [
              120.12601260126013,
              23.63751921924522
            ],
            [
              120.73807380738077,
              24.64469772088279
            ],
            [
              120.84608460846084,
              24.69679316062266
            ],
            [
              120.99009900990097,
              25.009365799061896
            ],
            [
              121.42214221422142,
              25.130921825121604
            ],
            [
              121.49414941494149,
              25.287208144341236
            ],
            [
              121.63816381638162,
              25.2177475580214
            ]
          ]
        ]
      ]
    }
  }
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

const countryStyles = {
    default: {
      fill: "#ECEFF1",
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
}


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
    }
    this.handleCitySelection = this.handleCitySelection.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleClickOpen = geo => {
    // this.setState({
    //   open: true,
    //   selectedValue: geo.properties.name,
    //   geo: geo,
    // });
    var self = this;
    axios.post('/getData', {
        id: geo.id,
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
    })
  }
  handleReset() {
    this.setState({
      center: [0,20],
      zoom: 1,
    })
  }
  render() {
    return (
      <div>
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
            }}
            >
            <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
              <Geographies geography="/world-50m.json">
                {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                  <Geography
                    key={i}
                    onClick = {() => this.handleClickOpen(geography)}
                    geography={geography}
                    projection={projection}
                    style={countryStyles}
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
