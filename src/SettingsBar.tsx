import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import SettingsModal from './SettingsModal';

const settingsImage = require("../assets/images/settings.png")

const SettingsBar: React.FC<{}> = ({ }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image style={styles.settingsImage} source={settingsImage} />
            </TouchableOpacity>

            <SettingsModal isVisible={isModalVisible} setVisible={setModalVisible}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(34,34,34)"
    },
    settingsImage: {
        width: 75,
        height: 75
    }
});

export default SettingsBar;
