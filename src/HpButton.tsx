import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, TouchableHighlight, Settings } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useGlobalState } from './context/AppSettings';
//import { useAppSettings } from './context/AppSettings';

interface HpButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    isDamage?: boolean;
}

const combatImage = require('../assets/images/combat.png');
const authorityImage = require('../assets/images/authority.png');

const HpButton: React.FC<HpButtonProps> = ({ title, onPress, disabled, isDamage: isCombat }) => {

    const { state } = useGlobalState();

    const gradientColors = disabled
        ? ['rgb(75, 75, 75)', 'rgb(139, 139, 139)', 'rgb(75, 75, 75)']
        : ['rgb(175, 175, 175)', 'rgb(239, 239, 239)', 'rgb(133, 133, 133)'];

    useEffect(() => {
    }, [state.useImage]);

    const backgroundImage = state.useImage ? (
        <ImageBackground
            style={styles.gradient}
            resizeMode='cover'
            source={isCombat ? combatImage : authorityImage}
        >
            <Text style={styles.text}>{title}</Text>
        </ImageBackground>
    ) : (
        <View style={styles.gradient}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );

    return (
        <TouchableHighlight
            underlayColor={isCombat ? "red" : "green"}
            style={[styles.container, disabled && styles.disabledButton]}
            onPress={onPress}
            disabled={disabled}
        >
            <LinearGradient
                colors={gradientColors}
                style={styles.gradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
                {backgroundImage}
            </LinearGradient>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    disabledButton: {
        backgroundColor: 'grey',
    },
    container: {
        borderWidth: 2,
        flex: 1,
    },
    gradient: {
        padding: 15,
    },
    text: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 28,
        color: 'rgb(5,5,5)'
    }
});

export default HpButton;
