import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput, Alert } from 'react-native';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const enviarFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert("Erro", "Por favor, digite seu feedback antes de enviar.");
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: feedback }), 
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Sucesso", "Feedback enviado com sucesso!");
        setFeedback('');
      } else {
        Alert.alert("Erro", "Houve um problema ao enviar o feedback.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível enviar o feedback. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback e Avaliações</Text>
      <TextInput
        style={styles.input}
        placeholder="Envie seu Feedback"
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      <Button title="Enviar Feedback" onPress={enviarFeedback} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    height: 150,
    textAlignVertical: 'top',
    color: 'black'
  },
});

export default Feedback;
