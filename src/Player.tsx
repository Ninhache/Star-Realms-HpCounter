import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import HpButton from './HpButton';

interface PlayerProps {
  life: number;
  onLifeChange: (newLife: number) => void;
  isReversed?: boolean;
}

const Player: React.FC<PlayerProps> = ({ life, onLifeChange, isReversed }) => {
  const containerStyle = [
    styles.container,
    isReversed ? styles.reversed : null,
  ];

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, 0), 50);
  }

  const willPositivExceed = (change: number, threshold: number) => life + change < threshold;
  const willNegativExceed = (change: number, threshold: number) => life + change > threshold;

  return (
    <View style={containerStyle}>
      <View style={styles.lifeTextContainer}>
        <Text style={styles.lifeText}>{life}</Text>
      </View>

      <View style={styles.hpContainer}>
        <HpButton title="- 5" disabled={willPositivExceed(-5, 0)} onPress={() => onLifeChange(clamp(life - 5, 0, 50))} />
        <HpButton title="- 1" disabled={willPositivExceed(-1, 0)} onPress={() => onLifeChange(clamp(life - 1, 0, 50))} />
        <HpButton title="+ 1" disabled={willNegativExceed(1, 50)} onPress={() => onLifeChange(clamp(life + 1, 0, 50))} />
        <HpButton title="+ 5" disabled={willNegativExceed(5, 50)} onPress={() => onLifeChange(clamp(life + 5, 0, 50))} />
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

    fontSize: 36,
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
