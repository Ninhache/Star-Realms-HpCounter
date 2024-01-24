import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HpButton from './HpButton';
import { useGlobalState } from './context/AppSettings';

interface PlayerProps {
  isReversed?: boolean;
}

const Player: React.FC<PlayerProps> = ({ isReversed }) => {

  const { state } = useGlobalState();

  const [life, setLife] = useState<number>(state.defaultLife);

  useEffect(() => {
    console.log("defaultLife:", state.defaultLife)
    setLife(state.defaultLife);
  }, [state.defaultLife]);

  const containerStyle = [
    styles.container,
    isReversed ? styles.reversed : null,
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
        <HpButton title={`${state.useImage ? '' : '-'}5`} disabled={willPositivExceed(-5, 0)} isDamage={true}
        onPress={() => {
          setLife(clamp(life - 5, 0, 50))
        }} />
        <HpButton title={`${state.useImage ? '' : '-'}1`} disabled={willPositivExceed(-1, 0)} isDamage={true} onPress={() => setLife(clamp(life - 1, 0, 50))} />
        <HpButton title={`${state.useImage ? '' : '+'}1`} onPress={() => setLife(life + 1)} />
        <HpButton title={`${state.useImage ? '' : '+'}5`} onPress={() => setLife(life + 5)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(208,40,47)',
  },
  reversed: {
    transform: [{ rotate: '180deg' }],
    backgroundColor: '#4550af'
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
    marginHorizontal: 20,
    textAlign: 'center',
  },
  hpContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  }
});

export default Player;
