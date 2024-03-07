import React, { useEffect, useState } from 'react';
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';

import { sleep } from './App';
import CheckBoxInput from './CheckBoxInput';
import Divider from './Divider';
import ExternalLink from './ExternalLink';
import SettingTextInput from './SettingTextInput';
import { GlobalState, useGlobalState } from './context/AppSettings';

const TextInputComponent: React.FC<{ parameterKey: string }> = ({ parameterKey }: { parameterKey: string }) => {
    const { state, dispatch } = useGlobalState();

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATE_PARAMETER',
            payload: { key: parameterKey, value: event.target.value },
        });
    };

    return (
        <input
            type="text"
            value={state[parameterKey]}
            onChange={handleTextChange}
        />
    );
};

interface SettingsModalProps {
    isVisible: boolean;
    setVisible: (bool: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isVisible, setVisible }) => {

    const { state, dispatch } = useGlobalState();

    const [localState, setLocalState] = useState<GlobalState>(state);

    const handleSave = () => {
        setVisible(false);
    };

    // const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     dispatch({
    //         type: 'UPDATE_PARAMETER',
    //         payload: { key: parameterKey, value: event.target.value },
    //     });
    // };

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

    const [defaultLife, setDefaultLife] = useState<number>(state['defaultLife']);

    // todo: find a correct way to reset the value lmao
    const resetLifepoint = async (e: boolean) => {
        dispatch({
            type: 'UPDATE_PARAMETER',
            payload: { key: 'defaultLife', value: (defaultLife - 1) },
        });
        await sleep(1)
        dispatch({
            type: 'UPDATE_PARAMETER',
            payload: { key: 'defaultLife', value: defaultLife },
        });
    };

    // const [useImage, setUseImage] = useState<boolean>(settings.useImage);

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

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.setting}> Default life points : </Text>
                                <SettingTextInput style={[styles.setting, { backgroundColor: '#3D3F41', borderRadius: 8, padding: 4}]} settingKey='defaultLife' />

                                <Divider color='#3D3F41' orientation='vertical' />

                                <TouchableOpacity style={styles.defaultLifePointButton} onPress={() => resetLifepoint()}>
                                    <Text style={[styles.setting]}>Reset life point</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <Divider color='transparent' dividerStyle={{marginTop: 8, marginBottom: 8}} />

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.setting}> Use Star realms images </Text>
                                <CheckBoxInput settingKey='useImage' />
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
        fontSize: 20,
        alignSelf: 'center', 
    },
    wip: {
        fontStyle: 'italic'
    },
    defaultLifePointButton: {
        alignSelf: 'stretch',
        backgroundColor: "rgb(34,34,34)",
        padding: 4,
        alignItems: 'center',
        borderRadius: 8
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
