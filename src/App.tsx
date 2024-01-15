import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

import Player from './Player';
import SettingsBar from './SettingsBar';
import { AppSettingsProvider } from './context/AppSettings';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppSettingsProvider>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Player isReversed={true} />
        <SettingsBar />
        <Player />
      </View>
    </AppSettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default App;
