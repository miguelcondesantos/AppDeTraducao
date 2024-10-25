import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const Configuracoes = ({ setIdiomaOrigem, setIdiomaDestino }) => {
  const [openOrigem, setOpenOrigem] = useState(false);
  const [valueOrigem, setValueOrigem] = useState(null);
  const [itemsOrigem, setItemsOrigem] = useState([]);

  const [openDestino, setOpenDestino] = useState(false);
  const [valueDestino, setValueDestino] = useState(null);
  const [itemsDestino, setItemsDestino] = useState([]);

  useEffect(() => {
    linguas()
  }, [])

  const linguas = async () => {
    try {
      const response = await axios.get('https://api-free.deepl.com/v2/languages', {
        params: {
          auth_key: '4ba7fc26-d08f-474d-b685-63137e832c49:fx',
        },
      });
  
      if (response.data) {
        const opcoesLinguas = response.data.map(lingua => ({
          label: lingua.name,
          value: lingua.language,
        }));
  
        setItemsOrigem(opcoesLinguas);
        setItemsDestino(opcoesLinguas);
      }
    } catch (error) {
      console.error('Erro ao carregar as línguas:', error);
    }
  };
  

  const handleIdiomaOrigemChange = (value) => {
    setValueOrigem(value);
    setIdiomaOrigem(value);
  };
  
  const handleIdiomaDestinoChange = (value) => {
    setValueDestino(value);
    setIdiomaDestino(value);
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configurações de Idiomas</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Idioma de Origem:</Text>
        <DropDownPicker
          open={openOrigem}
          value={valueOrigem}
          items={itemsOrigem}
          setOpen={setOpenOrigem}
          setValue={setValueOrigem}
          setItems={setItemsOrigem}
          onChangeValue={handleIdiomaOrigemChange}
          placeholder="Selecione o idioma"
          style={styles.picker}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Idioma de Destino:</Text>
        <DropDownPicker
          open={openDestino}
          value={valueDestino}
          items={itemsDestino}
          setOpen={setOpenDestino}
          setValue={setValueDestino}
          setItems={setItemsDestino}
          onChangeValue={handleIdiomaDestinoChange}
          placeholder="Selecione o idioma"
          style={styles.picker}
        />
      </View>
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
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black'
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    zIndex: 10,
  },
});

export default Configuracoes;
