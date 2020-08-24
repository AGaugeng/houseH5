import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Root, Spinner } from "native-base"
import AppNavigator from "./screens/"
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import store from './store'
import View from "./tool/View"
let persistor = persistStore(store);
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <PersistGate
            loading={
              <View vcenter hcenter style={{ height: deviceHeight, width: deviceWidth }}>
                <Spinner size={100} type='ChasingDots' color='#ff9800' />
              </View>
            }
            persistor={persistor}>
            <AppNavigator />
          </PersistGate>
        </Root>
      </Provider>
    );
  }
}
