import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';

const Home = ({ idiomaOrigem, idiomaDestino }) => {
  const [textoPraTraduzir, setTextoPraTraduzir] = useState('');
  const [textoTraduzido, setTextoTraduzido] = useState('Texto traduzido aparecerá aqui');

  useEffect(() => {
    if (textoPraTraduzir) {

      console.log('Valores enviados para a API:', {
        auth_key: '4ba7fc26-d08f-474d-b685-63137e832c49:fx',
        text: textoPraTraduzir,
        source_lang: idiomaOrigem,
        target_lang: idiomaDestino
      });

      handleTraduzir();
    }
  }, [textoPraTraduzir, idiomaOrigem, idiomaDestino]);

  const handleTraduzir = async () => {
    try {
      const response = await axios.post(
        `https://api-free.deepl.com/v2/translate`,
        null,
        {
          params: {
            auth_key: '4ba7fc26-d08f-474d-b685-63137e832c49:fx',
            text: textoPraTraduzir,
            source_lang: idiomaOrigem,
            target_lang: idiomaDestino
          }
        }
      );

      const traducao = response.data.translations[0].text;
      setTextoTraduzido(traducao);
    } catch (error) {
      console.error('Erro ao traduzir o texto:', error);
    }
  };


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
            onChangeText={setTextoPraTraduzir}
            value={textoPraTraduzir}
          />

          <Button
            title="Traduzir Voz"
            onPress={() => { /* função da voz vai ficar aqui depois*/ }}
          />

          <View style={styles.translationBox}>
            <Text style={styles.translationText}>{textoTraduzido}</Text>
          </View>
          
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
    color: 'black',
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
