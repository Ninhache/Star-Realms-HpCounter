import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useGlobalState, GlobalState } from './context/AppSettings';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface CheckBoxInputProps {
    settingKey: keyof GlobalState;
    style?: StyleProp<ViewStyle>;
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({ settingKey, style }) => {
    const { state, dispatch } = useGlobalState();

    const [localState, setLocalState] = useState<any>(state[settingKey]);

    useEffect(() => {
        setLocalState(state[settingKey]);
    }, [state[settingKey], settingKey]);

    const handlePress = (e: boolean) => {
        dispatch({
            type: 'UPDATE_PARAMETER',
            payload: { key: settingKey, value: e },
        });
    };

    return (
        <BouncyCheckbox
            style={style}
            fillColor='rgb(34,34,34)'
            size={35}
            onPress={handlePress}
            isChecked={!!state[settingKey]}
        />
    );
};

export default CheckBoxInput;