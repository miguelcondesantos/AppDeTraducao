import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const Traducao = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tradução de Texto em Imagens</Text>
      <Image 
        source={{ uri: 'https://3dmodels.org/wp-content/uploads/2020/08/17/among_us_crewmate_3d_model_1000_0001.jpg' }} 
        style={styles.image} 
      />
      <Button title="Capturar Imagem" onPress={() => { /* Função para capturar imagem */ }} />
      <Text style={styles.translation}>Texto traduzido aparecerá aqui</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black'
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 16,
  },
  translation: {
    fontSize: 16,
    color: '#333',
    marginTop: 16,
  },
});

export default Traducao;
