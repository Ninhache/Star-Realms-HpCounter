import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useGlobalState, GlobalState } from './context/AppSettings';

interface SettingTextInputProps {
    settingKey: keyof GlobalState;
    style?: StyleProp<ViewStyle>;
}

const SettingTextInput: React.FC<SettingTextInputProps> = ({ settingKey, style }) => {
    const { state, dispatch } = useGlobalState();
    const [localState, setLocalState] = useState<string>(state[settingKey]);

    useEffect(() => {
        setLocalState(state[settingKey]);
    }, [state[settingKey], settingKey]);

    const handleBlur = () => {
        if (localState !== state[settingKey]) {
            dispatch({
                type: 'UPDATE_PARAMETER',
                payload: { key: settingKey, value: localState },
            });
        }
    };

    return (
        <TextInput
            style={style}
            value={`${localState}`}
            onChangeText={setLocalState}
            onBlur={handleBlur}
        />
    );
};

export default SettingTextInput;