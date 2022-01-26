import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthenticationStack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login', header: () => null}}
      />
      <AuthenticationStack.Screen
        name="Register"
        component={Register}
        options={{
          title: '',
          headerShown: false,
        }}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthStack;
