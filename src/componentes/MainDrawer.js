import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../telas/Home';
import Traducao from '../telas/Traducao';
import Historico from '../telas/Historico';
import Feedback from '../telas/Feedback';
import Configuracoes from '../telas/Configuracoes';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const [idiomaOrigem, setIdiomaOrigem] = useState(null);
  const [idiomaDestino, setIdiomaDestino] = useState(null);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home">
          {props => (
            <Home
              {...props}
              idiomaOrigem={idiomaOrigem}
              idiomaDestino={idiomaDestino}
              setIdiomaOrigem={setIdiomaOrigem}
              setIdiomaDestino={setIdiomaDestino}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Traducao">
          {props => (
            <Traducao
              {...props}
              idiomaOrigem={idiomaOrigem}
              idiomaDestino={idiomaDestino}
              setIdiomaOrigem={setIdiomaOrigem}
              setIdiomaDestino={setIdiomaDestino}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Historico" component={Historico} />
        <Drawer.Screen name="Feedback" component={Feedback} />
        <Drawer.Screen name="Configuracoes">
          {props => (
            <Configuracoes
              {...props}
              setIdiomaOrigem={setIdiomaOrigem}
              setIdiomaDestino={setIdiomaDestino}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainDrawer;
