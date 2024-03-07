import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HpButton from './HpButton';
import { useGlobalState } from '../context/AppSettings';
import { Layout, PlayerCount } from '../App';

// todo: change this to handle an angle to have 4 players (for example)
export interface PlayerProps {
  isReversed?: boolean;
  id: number;
  highlight: boolean
}

const colorArray: string[] = [
  "#4550af",
  "#d0282f",
  "#45CF80",
  "#C0CF0F",  
]

const VerticalPlayer: React.FC<PlayerProps> = ({ id, isReversed = false, highlight }) => {

  const { state } = useGlobalState();

  const [life, setLife] = useState<number>(state.defaultLife);

  useEffect(() => {
    setLife(state.defaultLife);
  }, [state.defaultLife]);

  const dynamicStyle = {
    transform: [{ rotate: `${isReversed ? 180 : 0}deg` }],
    // backgroundColor: colorArray[id],
    backgroundColor: `${colorArray[id]}`,
    borderColor: highlight ? "red" : "black"
  };

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  const willPositivExceed = (change: number, threshold: number) => life + change < threshold;

  return (
    <View style={[styles.container, dynamicStyle]}>
      <View style={styles.lifeTextContainer}>
        <Text style={styles.lifeText}>{life}</Text>
      </View>

      <View style={styles.hpContainer}>
        <HpButton title={`${state.useImage ? '' : '-'}5`} disabled={willPositivExceed(-5, 0)} isCombat={true} onPress={() => { setLife(Math.max(parseInt(`${life}`, 10) - 5, 0))}} />
        <HpButton title={`${state.useImage ? '' : '-'}1`} disabled={willPositivExceed(-1, 0)} isCombat={true} onPress={() => setLife(Math.max(parseInt(`${life}`, 10) - 1, 0))} />
        <HpButton title={`${state.useImage ? '' : '+'}1`} onPress={() => setLife(parseInt(`${life}`, 10) + 1)} />
        <HpButton title={`${state.useImage ? '' : '+'}5`} onPress={() => setLife(parseInt(`${life}`, 10) + 5)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2
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
    
    textAlign: 'center',
  },
  hpContainer: {
    // flex: 1,
    flexDirection: 'row',
  }
});

export default VerticalPlayer;
