/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import MyComponent from './src/MyComponent';
import {LIST_ITEMS} from './src/constants';

function App(): React.JSX.Element {
  return <MyComponent data={LIST_ITEMS} />;
}

export default App;
