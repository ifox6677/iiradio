import React, { createContext, useState, useContext } from 'react';

// 创建 ThemeContext
const ThemeContext = createContext();

// 默认黑色主题
const defaultTheme = {
  primaryColor: '#0711b2',  // 主要颜色 (可以选择更适合黑色背景的颜色)
  secondaryColor: '#f1f1f1', // 辅助颜色
  textColor: '#fff',         // 文字颜色，白色（适合黑色背景）
  backgroundColor: '#000',   // 背景颜色，黑色
  fontFamily: 'Arial',       // 字体
  fontSize: 16,              // 默认字体大小
};

// 创建 ThemeProvider 组件来包裹整个应用
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    // 切换主题（示例）: 切换黑白色主题
    setTheme((prevTheme) => ({
      ...prevTheme,
      primaryColor: prevTheme.primaryColor === '#0711b2' ? '#ff6347' : '#0711b2',
      textColor: prevTheme.textColor === '#fff' ? '#333' : '#fff',
      backgroundColor: prevTheme.backgroundColor === '#000' ? '#fff' : '#000',
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 创建自定义 hook，方便访问主题
export const useTheme = () => useContext(ThemeContext);
