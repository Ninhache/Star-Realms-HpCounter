import React, { useEffect, useState } from 'react';
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State, TextInput } from 'react-native-gesture-handler';
import ExternalLink from './ExternalLink';
import { useAppSettings } from './context/AppSettings';


interface SettingsModalProps {
    isVisible: boolean;
    setVisible: (bool: boolean) => void;
}



const SettingsModal: React.FC<SettingsModalProps> = ({ isVisible, setVisible }) => {

    const { settings, setSettings } = useAppSettings();
    const [localLifePoints, setLocalLifePoints] = useState(settings.defaultLifePoints.toString());

    const handleSave = () => {

        setSettings({
            ...settings,
            defaultLifePoints: parseInt(localLifePoints, 10),
            useImage: useImage
        });
        setVisible(false);
    };

    const translateY = new Animated.Value(0);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    const onGestureEvent = Animated.event<PanGestureHandlerGestureEvent>(
        [{ nativeEvent: { translationY: translateY } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();

            if (event.nativeEvent.translationY > 100) {
                setVisible(false)
            }
        }
    };

    const [useImage, setUseImage] = useState<boolean>(settings.useImage);

    const github = require('../assets/images/github.png');

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setVisible(false)}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View style={[styles.modalView, { transform: [{ translateY }] }]}>
                        <View>

                            <Text style={styles.title}>Settings</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.setting}> Default life points : </Text>
                                <TextInput
                                    style={styles.setting}

                                    value={localLifePoints}
                                    onChangeText={setLocalLifePoints}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.setting}> Use Star realms images </Text>
                                <BouncyCheckbox fillColor='rgb(34,34,34)' size={35} onPress={() => setUseImage(!useImage)} />
                            </View>

                            {/* <Text style={[styles.setting, styles.wip]}> Soon working.. </Text> */}
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>

                            {/* <OpenURLButton url={"https://github.com/Ninhache/starrealms"}>Open Supported URL</OpenURLButton> */}
                            <ExternalLink url="https://github.com/Ninhache/starrealms"
                                style={{
                                    width: 50,
                                    height: 50,
                                    alignSelf: 'center',
                                    marginBottom: 12
                                }}
                            >
                                <Image
                                    style={{
                                        flex: 1,
                                        width: undefined,
                                        height: undefined,
                                    }}
                                    resizeMode='cover'
                                    source={github}
                                />
                            </ExternalLink>

                            <TouchableOpacity onPress={handleSave} style={styles.button}>
                                <Text>Quit parameters</Text>
                            </TouchableOpacity>
                        </View>

                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: "rgb(44,44,44)",
        padding: 20,

        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    setting: {
        fontSize: 24,
        alignSelf: 'center',
        marginEnd: 5
    },
    wip: {
        fontStyle: 'italic'
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: "rgb(34,34,34)",
        padding: 35,
        alignItems: 'center',
        borderRadius: 8
    }
});

export default SettingsModal;
