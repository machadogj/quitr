/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// COMPONENTS VIEWER!!!
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import ComponentsViewer from 'react-native-components-viewer';
import Tests from './specs';

class LayoutTest extends Component {
  render() {
    return (
      <ComponentsViewer specs={ Tests } />
    );
  }
}

AppRegistry.registerComponent('app', () => LayoutTest);

// NAVIGATION!!!
// import React, { Component } from 'react';
// import {
//   AppRegistry
// } from 'react-native';
// import Router from './src/router';
// import store from './src/store';
// import { Provider } from 'react-redux';

// class App extends Component {
//   render() {
//     return (
//       <Provider store={ store }>
//         <Router/>
//       </Provider>
//     );
//   }
// }

// AppRegistry.registerComponent('app', () => App);
