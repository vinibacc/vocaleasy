import React, { useState, useEffect } from 'react';
import { Button, Picker, TextInput, View } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  useEffect(() => {
    Speech.getAvailableVoicesAsync().then(availableVoices => {
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0].id);
    });
  }, []);

  const startReading = () => {
    Speech.speak(text, { voice: selectedVoice });
  };

  const pauseReading = () => {
    Speech.pause();
  };

  const resumeReading = () => {
    Speech.resume();
  };

  return (
    <View style={{ padding: 24 }}>
      <TextInput
        style={{ height: 200, borderColor: 'gray', borderWidth: 1 }}
        multiline
        onChangeText={setText}
        value={text}
      />
      <Picker selectedValue={selectedVoice} onValueChange={(itemValue) => setSelectedVoice(itemValue)}>
        {voices.map((voice, index) => <Picker.Item key={index} label={voice.name} value={voice.id} />)}
      </Picker>
      <Button title="Iniciar leitura" onPress={startReading} />
      <Button title="Pausar leitura" onPress={pauseReading} />
      <Button title="Retomar leitura" onPress={resumeReading} />
    </View>
  );
}