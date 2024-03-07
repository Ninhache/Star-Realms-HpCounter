import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HpButton from './HpButton';
import { useGlobalState } from '../context/AppSettings';
import { Layout } from '../App';
import { PlayerProps } from './VerticalPlayer';

const colorArray: string[] = [
  "#4550af",
  "#d0282f",
  "#45CF80",
  "#C0CF0F",  
]

const HorizontalPlayer: React.FC<PlayerProps> = ({ id, isReversed = false, highlight }) => {

  const { state } = useGlobalState();

  const [life, setLife] = useState<number>(state.defaultLife);

  

  useEffect(() => {
    setLife(state.defaultLife);
  }, [state.defaultLife]);

  const calculatedDegree = isReversed ? 180 : 0;

  const dynamicStyle = {
    transform: [{ rotate: `${calculatedDegree}deg` }],
    // backgroundColor: colorArray[id],
    backgroundColor: `${colorArray[id]}`,
    borderColor: highlight ? "red" : "black"
  };

  const containerStyle = [
    styles.container,
    
    dynamicStyle
  ];

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  const willPositivExceed = (change: number, threshold: number) => life + change < threshold;
  
  return (
    <View style={containerStyle}>
      <View style={styles.lifeTextContainer}>
        <Text style={styles.lifeText}>{life}</Text>
      </View>

      <View style={styles.hpContainer}>
        <HpButton degree={-90} title={`${state.useImage ? '' : '-'}5`} disabled={willPositivExceed(-5, 0)} isCombat={true} onPress={() => { setLife(Math.max(parseInt(`${life}`, 10) - 5, 0))}} />
        <HpButton degree={-90} title={`${state.useImage ? '' : '-'}1`} disabled={willPositivExceed(-1, 0)} isCombat={true} onPress={() => setLife(Math.max(parseInt(`${life}`, 10) - 1, 0))} />
        <HpButton degree={-90} title={`${state.useImage ? '' : '+'}1`} disabled={false} onPress={() => setLife(parseInt(`${life}`, 10) + 1)} />
        <HpButton degree={-90} title={`${state.useImage ? '' : '+'}5`} disabled={false} onPress={() => setLife(parseInt(`${life}`, 10) + 5)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

    borderWidth: 2,
    borderColor: 'black',
    
  },
  highlight: {
    borderColor: 'red',
  },
  lifeTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lifeText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 72,
    transform: [{ rotate: '-90deg' }],

    
    textAlign: 'center',
  },
  hpContainer: {
    // flex: 1,
    flexDirection: 'column',
  }
});

export default HorizontalPlayer;
