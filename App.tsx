/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Navigation from './src/services/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store/stroe';



function App(): React.JSX.Element {

  return (
    // <SafeAreaView>
    // <LoginForm></LoginForm>
    // <RegisterForm></RegisterForm>
    // <HomeScreen />
    // </SafeAreaView>
    <Provider store={store}>
      <Navigation />
    </Provider>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
