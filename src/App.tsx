import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import HorizontalPlayer from './Player/HorizontalPlayer';
import VerticalPlayer from './Player/VerticalPlayer';
import SettingsBar from './SettingsBar';
import { GlobalStateProvider } from './context/AppSettings';

export type Layout = "HORIZONTAL" | "VERTICAL";
export type PlayerCount = 1 | 2 | 3 | 4;

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  const playerCount: PlayerCount = 2;
  const middle: number = Math.ceil(playerCount / 2);

  const layout: Layout = playerCount > 2 ? "HORIZONTAL" : "VERTICAL";

  // const playersElement: React.ReactNode = [];
  const leftPart: React.ReactNode[] = [];
  const rightPart: React.ReactNode[] = [];

  const [highlight, setHighlight] = useState(-1);


  let isSelecting = false;  
  const onPlayerSelect = async () => {
    // basic lock to avoid spamming the button
    if (isSelecting) return;

    isSelecting = true;

    const sequenceLength = 20;

    const generatedSequence = (): number[] => {
      let array: number[] = [];
      for (let i: number = 0; i < sequenceLength; i++) {
        array.push(Math.round(Math.random() * (playerCount - 1)));
      }
      return array;
    }

    const sequence: number[] = generatedSequence();

    // need 1 2 4 3
    for (let i: number = 0; i < sequenceLength; i++) {
      setHighlight(sequence[i]);
      await sleep(15 * (i + 1));
    }

    await sleep(300);

    const choosenPlayer = sequence[sequenceLength - 1];
    
    for (let i: number = 0; i < 5; i++) {
      setHighlight(choosenPlayer);
      await sleep(250);
      setHighlight(-1);
      await sleep(250);
    }

    isSelecting = false;
    await sleep(5000);
    setHighlight(-1)
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
                <SettingsBar onPlayerSelect={onPlayerSelect} />
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
                <SettingsBar onPlayerSelect={onPlayerSelect} />
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
