import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';

const Home = () => {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Tradutor em Tempo Real</Text>
          </View>
          <View style={styles.mainContent}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Digite o texto para traduzir" 
            />
            <Button title="Traduzir" onPress={() => { /* Função de tradução */ }} />
            <View style={styles.translationBox}>
              <Text style={styles.translationText}>Texto traduzido aparecerá aqui</Text>
            </View>
            <Button title="Traduzir Voz" onPress={() => { /* Função de tradução de voz */ }} />
          </View>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#007BFF',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    headerText: {
      color: '#fff',
      fontSize: 24,
      textAlign: 'center',
    },
    mainContent: {
      flex: 1,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      backgroundColor: '#fff',
      color: 'black'
    },
    translationBox: {
      marginBottom: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    translationText: {
      fontSize: 16,
      color: '#333',
    },
  });
  
  export default Home;