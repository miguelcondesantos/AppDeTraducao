import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../telas/Home';
import Traducao from '../telas/Traducao';
import Historico from '../telas/Historico';
import Feedback from '../telas/Feedback';
import Configuracoes from '../telas/Configuracoes';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Traducao" component={Traducao} />
        <Drawer.Screen name="Historico" component={Historico} />
        <Drawer.Screen name="Feedback" component={Feedback} />
        <Drawer.Screen name="Configuracoes" component={Configuracoes} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainDrawer;
