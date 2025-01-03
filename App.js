import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen'; // 引入首页

const Stack = createNativeStackNavigator();

// 定义主题
const theme = {
  primaryColor: '#fff',  // 主要颜色
  secondaryColor: '#f1f1f1', // 辅助颜色
  textColor: '#fff',         // 文字颜色
  backgroundColor: '#000',   // 背景颜色
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.backgroundColor} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.backgroundColor, // 设置标题栏的背景颜色为主题背景颜色
            height: 0,  // 调整标题栏的高度，使其与设置按钮的高度一致
          },
          headerTintColor: theme.primaryColor, // 设置标题栏的文字颜色为主题主要颜色
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }} // 隐藏标题栏
          children={(props) => <HomeScreen {...props} theme={theme} />} // 将 theme 传递给 HomeScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
