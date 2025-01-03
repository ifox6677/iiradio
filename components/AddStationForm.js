import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const AddStationForm = ({ visible, onClose, onAddStation }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddStation = () => {
    const newStation = {
      name,
      iurl: url,
      category,
      imageUrl: imageUrl || 'https://raw.githubusercontent.com/ifox6677/live/main/radio/myradio.png', // 默认图片
    };
    onAddStation(newStation);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="电台名称"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="流媒体URL"
            value={url}
            onChangeText={setUrl}
            style={styles.input}
          />
          <TextInput
            placeholder="分类"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />
          <TextInput
            placeholder="图片URL (可选)"
            value={imageUrl}
            onChangeText={setImageUrl}
            style={styles.input}
          />
          <Button title="添加电台" onPress={handleAddStation} />
          <Button title="取消" onPress={onClose} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddStationForm;