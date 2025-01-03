import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export default function SettingsPicker({ onClose, onSelectOption }) {
  return (
    <Modal transparent visible onRequestClose={onClose}>
      <View style={pickerStyles.overlay}>
        <View style={pickerStyles.container}>
          <Text style={pickerStyles.title}>设置</Text>
          <TouchableOpacity
            style={pickerStyles.option}
            onPress={() => onSelectOption('定时播放')}
          >
            <Text style={pickerStyles.optionText}>定时播放</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={pickerStyles.option}
            onPress={() => onSelectOption('关于')}
          >
            <Text style={pickerStyles.optionText}>关于</Text>
          </TouchableOpacity>
          <TouchableOpacity style={pickerStyles.closeButton} onPress={onClose}>
            <Text style={pickerStyles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const pickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
    backgroundColor: '#000', // 黑色背景
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // 白色字体
  },
  option: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#333', // 深灰背景
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#fff', // 白色字体
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#0711b2', // 保持原来的蓝色
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff', // 白色字体
    fontSize: 16,
  },
});
