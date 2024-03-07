import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import HorizontalPlayer from './Player/HorizontalPlayer';
import VerticalPlayer from './Player/VerticalPlayer';
import SettingsBar from './SettingsBar';
import { GlobalStateProvider } from './context/AppSettings';

// type Player = { };
export type Layout = "HORIZONTAL" | "VERTICAL";
export type PlayerCount = 1 | 2 | 3 | 4;

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  const playerCount: PlayerCount = 4;
  const middle: number = Math.ceil(playerCount / 2);

  const layout: Layout = playerCount > 2 ? "HORIZONTAL" : "VERTICAL";

  // const playersElement: React.ReactNode = [];
  const leftPart: React.ReactNode[] = [];
  const rightPart: React.ReactNode[] = [];

  const [highlight, setHighlight] = useState(-1);

  const onPlayerSelect = (playerId: number) => {
    console.log(`Player selected: ${playerId}`);
    
  };

  if (layout === "VERTICAL") {
    for (let i: number = 0; i < playerCount; i++) {
      if (i < middle) {
        leftPart.push(<VerticalPlayer highlight={i == highlight} id={i} key={i} isReversed={i < middle} />)
      } else {
        rightPart.push(<VerticalPlayer highlight={i == highlight} id={i} key={i} isReversed={i < middle} />)
      }
    }
  } else {
    for (let i: number = 0; i < playerCount; i++) {
      if (i < middle) {
        leftPart.push(<HorizontalPlayer highlight={i == highlight} id={i} key={i} isReversed={i < middle && i % 2 === 0} />)
      } else {
        rightPart.push(<HorizontalPlayer highlight={i == highlight} id={i} key={i} isReversed={true && i % 2 === 0} />)
      }
    }
  }

  console.log(leftPart[0])

  const dynamicStyle = {
    flex: 1,
    // flexDirection: layout === 'HORIZONTAL' ? 'row' : 'column',
  };

  return (
    <GlobalStateProvider>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {/* <SettingsBar /> */}
        <View style={dynamicStyle}>

          {
            layout === "HORIZONTAL" && (
              <>
                <SettingsBar playersLength={playerCount} onPlayerSelect={onPlayerSelect} />
                <>
                  <View style={styles.playerContainer}>
                    {leftPart}
                  </View>
                  <View style={styles.playerContainer}>
                    {rightPart}
                  </View>
                </>
              </>
            )
          }

          {
            layout === "VERTICAL" && (
              <>
                {
                  leftPart.length >= 1 && <View style={styles.playerContainer}>
                    {leftPart}
                  </View>
                }
                <SettingsBar playersLength={playerCount} onPlayerSelect={onPlayerSelect} />
                {
                  rightPart.length >= 1 && <View style={styles.playerContainer}>
                    {rightPart}
                  </View>
                }
              </>
            )
          }


        </View>
      </View>
    </GlobalStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  playerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default App;
