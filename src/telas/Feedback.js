import React from 'react';
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';

const Feedback = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback e Avaliações</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Digite seu feedback" 
        multiline 
      />
      <Button title="Enviar Feedback" onPress={() => { /* Função para enviar feedback */ }} />
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
    color:'black'
  },
});

export default Feedback;
