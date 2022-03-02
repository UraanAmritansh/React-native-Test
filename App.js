import React from 'react';
import { SafeAreaView, StyleSheet, View, LogBox} from 'react-native';
import Router from './src/routes';
import colors from './src/constants/colors';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/toast';

LogBox.ignoreAllLogs()

const App= () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex:1}}>
        <Router />
      </SafeAreaView>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ 
    backgroundColor: colors.white,
    flex: 1 
  }
});

export default App;