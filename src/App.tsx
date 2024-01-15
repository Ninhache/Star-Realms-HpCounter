import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Player from './Player';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [playerOneLife, setPlayerOneLife] = useState<number>(50);
  const [playerTwoLife, setPlayerTwoLife] = useState<number>(50);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Player 
        life={playerTwoLife} 
        onLifeChange={setPlayerTwoLife}
        isReversed={true} 
      />
      <Player 
        life={playerOneLife} 
        onLifeChange={setPlayerOneLife} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
