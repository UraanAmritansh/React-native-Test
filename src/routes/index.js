
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar  , Platform} from 'react-native';
import colors from '../constants/colors';
import AppNavigations from './app-routes';

const Routes = () => {

    return (
        <NavigationContainer>
            <StatusBar barStyle={Platform.OS==='ios'?'default':'light-content'} backgroundColor={colors.themeBlue} />
            <AppNavigations />
        </NavigationContainer>
    );
}

export default Routes;