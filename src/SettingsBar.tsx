import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Layout } from './App';
import SettingsModal from './SettingsModal';

const settingsImage = require("../assets/images/settings.png")

interface SettingsBarProps {
    layout?: Layout,
    onPlayerSelect?: (playerId: number) => void;
    playersLength: number;
  }

const SettingsBar: React.FC<SettingsBarProps> = ({ playersLength, onPlayerSelect = () => {console.log("UNDEFINED FUNCTION")} , layout = "HORIZONTAL" }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const selectRandomly = (): void => {
        console.log("choose player X from the list []");
        onPlayerSelect(Math.round(Math.random() * (playersLength - 1)));
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image style={styles.settingsImage} source={settingsImage} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectRandomly()}>
                <Image style={styles.settingsImage} source={settingsImage} />
            </TouchableOpacity>

            <SettingsModal isVisible={isModalVisible} setVisible={setModalVisible}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "rgb(34,34,34)"
    },
    settingsImage: {
        width: 75,
        height: 75
    }
});

export default SettingsBar;
