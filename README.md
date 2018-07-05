# World-Conquer 世界制霸

> 🏃 A small game built with React, MongoDB, Express and Node.js


<p align=center>
<a target="_blank" href="https://npmjs.org/package/life-commit" title="NPM version"><img src="https://img.shields.io/npm/v/life-commit.svg"></a><a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a><a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a><a target="_blank" href="http://makeapullrequest.com" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
</p>  




- Front-end Framework: **React, React-dom**
- Front-end Ajax communication: **axios**
- Front-end Web RWD Design: **Material-ui, React-Simple-Map**
- Back-end: **Node.js, Express.js**
- Database: **Mongoose, MongoDB**
- Bundle: **Webpack, Babel**

### Demo

https://beautiful-yosemite-17715.herokuapp.com/
![](img/demo.gif)


## How-to(in local)

```
clone the repo
$ mongod
$ npm install 
$ npm run build
$ npm start 

# demo page: http://localhost:8080/
```



## Directory Tree

```
$ tree
.
├── README.md
├── package-lock.json
├── package.json
├── data.json
├── public
│   ├── assets/
|   ├── outputs/
│   ├── index.html
│   ├── world-50m.json
│   └── world-50m-with-population.json
├── server.js
├── src
│   ├── app
|   |   ├── App.js
│   │   ├── ButtonAppBar.js
│   │   ├── dialog.js
│   │   ├── index.js
│   │   ├── InsertListItem.js
│   │   ├── Login.js
│   │   ├── map.js
│   │   ├── menu.js
│   │   ├── SignUp.js
│   ├── models
│   │   ├── Map.js
│   │   └── User.js
│   └── sockets
│       ├── MapSocket.js
│       └── UserSocket.js
└── webpack.config.js

```

## License

MIT License


## Main Feature

- Login/Signup Feature
  - Save your own map in the server
  - Sign up with username + password
  - block unauthorized visitor
- City Zoom in/out button
  - Zoom at paticular city 
  - Click reset button to reset zoom
- Map Layout
  - Including all continents excepts Antarctica
  - Click on a country to view information in a dialog
  - Choose your level in the dialog
  - Click outside of the dialog, press ESC, or click cancel to discard changes
  - Scores are summed and displayed on top
  - A title comes with your score
- Save Map
  - Press screenshot button and download your map
- show **username** on the top bar, and also user's **score** and **title**
- Logout button
- MongoDB database: `worlddb`
  - there are 2 collections in this database: `maps` and `users`
- Supporting Front-end design frameworks: 
  - [Material UI](https://material-ui-next.com/)
  - [Reacct Simple Maps](https://www.react-simple-maps.io/)

## Known bugss
1. A few countries in Africa are not in our database

## To-do

1. Visit your friend's maps
2. Connect with Facebook, Google, Twitter...etc
3. Set more marks on map
4. Comment feature

