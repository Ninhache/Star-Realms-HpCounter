import React from 'react';
import { Linking, Text, TextStyle, TouchableOpacity, View } from 'react-native';

interface ExternalLinkProps {
    url: string;
    children: React.ReactNode;
    style?: TextStyle;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ url, children, style = {} }) => {

    const onPress = () => Linking.canOpenURL(url).then(() => {
        Linking.openURL(url);
    });

    return (
        <TouchableOpacity onPress={onPress} style={style}>
            {children}
        </TouchableOpacity>
    );
};


export default ExternalLink;