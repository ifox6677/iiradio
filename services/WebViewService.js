import { NativeModules, Platform } from 'react-native';

export const startWebViewService = (url) => {
  if (Platform.OS === 'android') {
    const intent = new NativeModules.Intent('com.xray8989.iRadio.WebViewForegroundService');
    intent.putExtra('uri', url); // 传递 URL 给后台服务
    intent.startService();
  }
};
