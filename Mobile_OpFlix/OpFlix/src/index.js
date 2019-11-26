import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import FiltroDataScreen from './pages/FiltroData';
import FiltroCategoriaScreen from './pages/FiltroCategoria';
import LancamentosScreen from './pages/Lançamentos';
import LoginInScreen from './pages/Login';
import VerificacaoScreen from './pages/Verificacao';

const AuthStack = createStackNavigator ({
  Sign: {
    screen: LoginInScreen
  }
});

const VerificacaoStack = createStackNavigator ({
  Verificacao: {
    screen: VerificacaoScreen
  }
});

const MainNavigator = createBottomTabNavigator(
    {
      FiltrarData: {
        screen: FiltroDataScreen,
      },
      Lancamentos: {
        screen: LancamentosScreen,
      },
      FiltrarCategoria: {
        screen: FiltroCategoriaScreen,
      },
    },
  {
    initialRouteName: 'Lancamentos',
    tabBarOptions: {
      showIcon: true,
      showLabel: false, 
      inactiveBackgroundColor: '#040CF9',
      activeBackgroundColor: '#112DFB',
      style: {
        width: '100%',
        height: 50,
      },
    },
  },
  );

export default createAppContainer(createSwitchNavigator(
  {
    MainNavigator,
    AuthStack,
    VerificacaoStack,
  }, {
    initialRouteName: 'VerificacaoStack',
  }
));
