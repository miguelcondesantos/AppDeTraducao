import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';

const Home = ({ idiomaOrigem, idiomaDestino }) => {
  const [textoPraTraduzir, setTextoPraTraduzir] = useState('');
  const [textoTraduzido, setTextoTraduzido] = useState('Texto traduzido aparecerá aqui');
  const webviewRef = useRef(null);

  useEffect(() => {
    if (textoPraTraduzir) {
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
            target_lang: idiomaDestino,
          },
        }
      );

      const traducao = response.data.translations[0].text;
      setTextoTraduzido(traducao);
    } catch (error) {
      console.error('Erro ao traduzir o texto:', error);
    }
  };

  const handleVoiceRecognition = () => {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(`
        (function() {
          const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          recognition.lang = '${idiomaOrigem}';
          recognition.onresult = function(event) {
            const textoReconhecido = event.results[0][0].transcript;
            window.ReactNativeWebView.postMessage(textoReconhecido);
          };
          recognition.onerror = function(event) {
            window.ReactNativeWebView.postMessage('Erro no reconhecimento: ' + event.error);
          };
          recognition.onend = function() {
            recognition.start();
          };
          recognition.start();
        })();
      `);
      console.log('Ta indo');
      
    }
  };

  const onMessage = (event) => {
    console.log("Texto reconhecido:", event.nativeEvent.data);
    setTextoPraTraduzir(event.nativeEvent.data);
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
            onPress={handleVoiceRecognition}
          />
          <View style={styles.translationBox}>
            <Text style={styles.translationText}>{textoTraduzido}</Text>
          </View>
        </View>
      </ScrollView>
      <WebView
        ref={webviewRef}
        style={{ display: 'none' }}
        onMessage={onMessage}
        javaScriptEnabled={true}
      />
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
