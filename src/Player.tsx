import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import HpButton from './HpButton';
import { useAppSettings } from './context/AppSettings';

interface PlayerProps {
  isReversed?: boolean;
}

const Player: React.FC<PlayerProps> = ({ isReversed }) => {

  const { settings } = useAppSettings();

  const [life, setLife] = useState<number>(settings.defaultLifePoints);

  useEffect(() => {
    setLife(settings.defaultLifePoints);
  }, [settings])

  const containerStyle = [
    styles.container,
    isReversed ? styles.reversed : null,
  ];

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  const willPositivExceed = (change: number, threshold: number) => life + change < threshold;
  // useless since in the rules, authority can be infinite
  // const willNegativExceed = (change: number, threshold: number) => life + change > threshold;

  return (
    <View style={containerStyle}>
      <View style={styles.lifeTextContainer}>
        <Text style={styles.lifeText}>{life}</Text>
      </View>

      <View style={styles.hpContainer}>
        <HpButton title="5" disabled={willPositivExceed(-5, 0)} isDamage={true} onPress={() => setLife(clamp(life - 5, 0, 50))} />
        <HpButton title="1" disabled={willPositivExceed(-1, 0)} isDamage={true} onPress={() => setLife(clamp(life - 1, 0, 50))} />
        <HpButton title="1" onPress={() => setLife(life + 1)} />
        <HpButton title="5" onPress={() => setLife(life + 5)} />
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
