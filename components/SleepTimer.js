import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  startBackgroundTask,
  stopBackgroundTask,
  bgSetTimeout,
  bgSetInterval,
  bgClearTimeout,
  bgClearInterval,
} from 'expo-background-timer'; // 导入 expo-background-timer

const SleepTimer = ({ visible, onClose, onTimerEnd, onTimerUpdate }) => {
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0); // 用于存储剩余时间

  useEffect(() => {
    // 启动后台任务
    startBackgroundTask().then(() => {
      if (selectedMinutes > 0) {
        const totalSeconds = selectedMinutes * 60;
        setRemainingTime(totalSeconds); // 初始化剩余时间

        // 设置定时器，用于每秒更新剩余时间
        const intervalId = bgSetInterval(() => {
          setRemainingTime((prevTime) => {
            if (prevTime <= 1) {
              bgClearInterval(intervalId); // 清除定时器
              onTimerEnd(); // 定时器结束
              onClose(); // 关闭模态框
              stopBackgroundTask(); // 停止后台任务
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000); // 每秒更新一次剩余时间

        // 清理定时器和停止后台任务
        return () => {
          bgClearInterval(intervalId); // 清除定时器
          stopBackgroundTask(); // 停止后台任务
        };
      }
    });

    // 组件卸载时停止后台任务
    return () => {
      stopBackgroundTask();
    };
  }, [selectedMinutes, onTimerEnd, onClose, onTimerUpdate]);

  // 将剩余时间传递给父组件
  useEffect(() => {
    onTimerUpdate(remainingTime);
  }, [remainingTime, onTimerUpdate]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>睡眠定时器</Text>
          <Picker
            selectedValue={selectedMinutes}
            onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
          >
            <Picker.Item label="关闭" value={0} />
            <Picker.Item label="5 分钟" value={5} />
            <Picker.Item label="10 分钟" value={10} />
            <Picker.Item label="15 分钟" value={15} />
            <Picker.Item label="30 分钟" value={30} />
            <Picker.Item label="60 分钟" value={60} />
          </Picker>
          <Text style={styles.timerText}>
            剩余时间: {Math.floor(remainingTime / 60)}:{remainingTime % 60}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  timerText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default SleepTimer;
