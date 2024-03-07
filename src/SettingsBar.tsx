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
const selectImage = require("../assets/images/select.png")

interface SettingsBarProps {
    layout?: Layout,
    onPlayerSelect?: () => void;
}

const SettingsBar: React.FC<SettingsBarProps> = ({ onPlayerSelect = () => {console.log("UNDEFINED FUNCTION")} , layout = "HORIZONTAL" }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image style={styles.settingsImage} source={settingsImage} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPlayerSelect()}>
                <Image style={styles.settingsImage} source={selectImage} />
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
