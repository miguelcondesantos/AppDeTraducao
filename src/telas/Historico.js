import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


const Historico = () => {

  const history = [
    { id: '1', text: 'Olá', traducao: 'Hello' },
    { id: '2', text: 'Bom dia', traducao: 'Good morning' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Histórico de Traduções</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Original: {item.text}</Text>
            <Text style={styles.text}>Traduzido: {item.traducao}</Text>
          </View>
        )}
      />
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
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});


export default Historico;
