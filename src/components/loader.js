import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../constants/colors';

const Loader = ({ color }) => (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
        <ActivityIndicator color={color || colors.darkBlue} size={40} />
    </View>
)

export default Loader;