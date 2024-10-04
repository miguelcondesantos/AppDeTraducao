import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Configuracoes = () => {
  const [openOrigem, setOpenOrigem] = useState(false);
  const [valueOrigem, setValueOrigem] = useState(null);
  const [itemsOrigem, setItemsOrigem] = useState([
    { label: 'Inglês', value: 'en' },
    { label: 'Português', value: 'pt' },
  ]);

  const [openDestino, setOpenDestino] = useState(false);
  const [valueDestino, setValueDestino] = useState(null);
  const [itemsDestino, setItemsDestino] = useState([
    { label: 'Inglês', value: 'en' },
    { label: 'Português', value: 'pt' },
  ]);

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
    color:'black  '
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    zIndex: 10,
  },
});

export default Configuracoes;
