import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Checkout from '../screens/Checkout';

const stackRoutes = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerTitle: 'FMLRIFAS',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'rgba(0,0,0,0.5)' },
      }}>
      <stackRoutes.Screen
        name='Home'
        component={Home}
      />

      <stackRoutes.Screen
        name='Checkout'
        component={Checkout}
      />
    </stackRoutes.Navigator>
  );
};

export default AppRoutes;