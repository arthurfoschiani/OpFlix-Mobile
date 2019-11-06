import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import FiltroDataScreen from './pages/FiltroData';
import FiltroCategoriaScreen from './pages/FiltroCategoria';
import LancamentosScreen from './pages/Lançamentos';
import LoginInScreen from './pages/Login';

const AuthStack = createStackNavigator ({
  Sign: {
    screen: LoginInScreen
  }
});

const MainNavigator = createBottomTabNavigator(
    {
    Lancamentos: {
      screen: LancamentosScreen,
    },
    FiltrarData: {
      screen: FiltroDataScreen,
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
    AuthStack    
  }, {
    initialRouteName: 'AuthStack',
  }
));
