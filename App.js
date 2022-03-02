import React from 'react';
import { SafeAreaView, StyleSheet, View, LogBox} from 'react-native';
import Router from './src/routes';
import colors from './src/constants/colors';

LogBox.ignoreAllLogs()

const App= () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex:1}}>
        <Router />
      </SafeAreaView>
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