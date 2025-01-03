import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const { height } = Dimensions.get('window'); // 获取屏幕高度

export default function PlayScreen({ route, navigation }) {
  const { station } = route.params || {};

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#000' },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  if (!station) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: No station data provided.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerContainer}>
        <WebView
          source={{ uri: station.url }}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          style={styles.webView}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    position: 'absolute', // 将容器定位到屏幕底部
    bottom: 0,
    width: '100%',
    height: height / 3, // 占屏幕的三分之一高度
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -2 },
    overflow: 'hidden', // 确保内容不会超出圆角边界
  },
  webView: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
