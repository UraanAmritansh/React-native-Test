import Toast from 'react-native-toast-message';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export const toastConfig = {
    info: ({ text1, text2 }) => (
        <View style={styles.container}>
            <Text style={styles.text}>{text1}</Text>
            {text2 && <Text style={styles.text}>{text2}</Text>}
        </View>
    ),
    error: ({ text1, text2 }) => (
        <View style={styles.container}>
            <Text style={styles.text}>{text1}</Text>
            {text2 && <Text style={styles.text}>{text2}</Text>}
        </View>
    ),
    success: ({ text1, text2 }) => (
        <View style={styles.container}>
            <Text style={styles.text}>{text1}</Text>
            {text2 && <Text style={styles.text}>{text2}</Text>}
        </View>
    )
}

const ToastMessage = (type, title, description) => {
    Toast.show({
        type, //'success | error | info'
        position: 'bottom', //top | bottom
        text1: title || type.toUpperCase(),
        text2: description,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
    });
}

const styles = StyleSheet.create({
    container: { backgroundColor: colors.darkGrey, zIndex: 100, paddingHorizontal: 20, borderRadius: 20, paddingVertical: 10 },
    text: { color: colors.white, textAlign: 'center' }
})

export default ToastMessage;