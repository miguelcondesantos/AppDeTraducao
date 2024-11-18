import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import axios from 'axios';

const Traducao = ({ idiomaOrigem, idiomaDestino }) => {
  const [imagem, setImagem] = useState(null);
  const [imagemTraduzida, setImagemTraduzida] = useState(null);
  const [textoExtraido, setTextoExtraido] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Função para capturar imagem
  const handleCapturarImagem = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('Usuário cancelou a captura');
        } else if (response.errorCode) {
          console.error('Erro ao capturar imagem:', response.errorMessage);
        } else {
          const source = { uri: response.assets[0].uri };
          setImagem(source);
          processarTextoNaImagem(source.uri);
        }
      }
    );
  };

  // Função para processar texto da imagem usando ML Kit
  const processarTextoNaImagem = async (imagemUri) => {
    try {
      console.log('Reconhecendo texto da imagem:', imagemUri);
      const result = await TextRecognition.recognize(imagemUri);
      const textoExtraidoML = result.blocks.map((block) => block.text).join('\n');
      console.log('Texto extraído:', textoExtraidoML);
      setTextoExtraido(textoExtraidoML);
      traduzirTexto(textoExtraidoML);
    } catch (error) {
      console.error('Erro ao reconhecer texto:', error);
    }
  };

  // Função para traduzir texto
  const traduzirTexto = async (texto) => {
    try {
      console.log('Traduzindo texto:', texto);
      setCarregando(true);
      const response = await axios.post(
        `https://api-free.deepl.com/v2/translate`,
        null,
        {
          params: {
            auth_key: '4ba7fc26-d08f-474d-b685-63137e832c49:fx',
            text: texto,
            source_lang: idiomaOrigem,
            target_lang: idiomaDestino,
          },
        }
      );

      const traducao = response.data.translations[0].text;
      console.log('Tradução:', traducao);
      setTextoExtraido(traducao);
      setCarregando(false);
    } catch (error) {
      console.error('Erro ao traduzir o texto:', error);
      setCarregando(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tradução por Imagem</Text>
      </View>
      <View style={styles.content}>
        <Button title="Capturar Imagem" onPress={handleCapturarImagem} />
        {imagem && <Image source={imagem} style={styles.image} />}
        {carregando ? (
          <Text style={styles.placeholder}>Traduzindo...</Text>
        ) : textoExtraido ? (
          <Text style={styles.translatedText}>{textoExtraido}</Text>
        ) : (
          <Text style={styles.placeholder}>O texto traduzido aparecerá aqui</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
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
  content: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 16,
    marginBottom: 16,
  },
  translatedText: {
    fontSize: 18,
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default Traducao;
