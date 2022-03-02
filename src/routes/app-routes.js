import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import ReadMe from '../screens/ReadMe';
import DetailRepo from '../screens/DetailRepo';

const Stack = createStackNavigator();

const AppNavigation = () => {

    return (
        <Stack.Navigator
        initialRouteName={'Dashboard'}
        screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={'Dashboard'} component={Dashboard} />
            <Stack.Screen name={'ReadMe'} component={ReadMe} />
            <Stack.Screen name={'DetailRepo'} component={DetailRepo} />
        </Stack.Navigator>
    );
}

export default AppNavigation;