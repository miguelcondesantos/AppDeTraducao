import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Home = () => {
  const [textToTranslate, setTextToTranslate] = useState(''); 
  const [translatedText, setTranslatedText] = useState('Texto traduzido aparecerá aqui'); 
  const [targetLang, setTargetLang] = useState('PT'); 

  const toggleLanguage = () => {
    setTargetLang(prevLang => (prevLang === 'PT' ? 'EN' : 'PT')); 
  };

  const handleTraduzir = async () => {
    try {
      const response = await axios.post(
        `https://api-free.deepl.com/v2/translate`,
        null,
        {
          params: {
            auth_key: '4ba7fc26-d08f-474d-b685-63137e832c49:fx', 
            text: textToTranslate,
            target_lang: targetLang 
          }
        }
      );

      const translated = response.data.translations[0].text;
      setTranslatedText(translated); 
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
            onChangeText={setTextToTranslate} 
            value={textToTranslate}
          />
          <Button title="Traduzir" onPress={handleTraduzir} />
          
          <TouchableOpacity style={styles.languageToggle} onPress={toggleLanguage}>
            <Text style={styles.languageToggleText}>
              {targetLang === 'PT' ? 'Inglês para Português' : 'Português para Inglês'}
            </Text>
          </TouchableOpacity>

          <View style={styles.translationBox}>
            <Text style={styles.translationText}>{translatedText}</Text>
          </View>
          <Button 
            title="Traduzir Voz" 
            onPress={() => { /* função da voz vai ficar aqui depois*/ }} 
          />
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
  languageToggle: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  languageToggleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Home;
