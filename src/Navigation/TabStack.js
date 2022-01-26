import React from 'react';
import Home from '../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import SearchResults from '../screens/SearchResults';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Publish from '../screens/Publish';
import MyReservations from '../screens/MyReservations';

const Stack = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Acceuil"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
          tabBarLabel: 'Acceuil',
          tabBarBadge: 3,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          title: 'SearchResults',
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="search" size={size} color={color} />;
          },
          tabBarLabel: 'Recherche',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Stack.Screen
        name="Publier"
        component={Publish}
        options={{
          title: 'Publier',
          headerTitleAlign: 'center',
          headerTitle: 'Nouvelle publication',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            );
          },
          tabBarHideOnKeyboard: true,
        }}
      />
      <Stack.Screen
        name="flights"
        component={MyReservations}
        options={{
          title: 'Mes colis',
          tabBarIcon: ({focused, color, size}) => {
            return <MaterialIcon name="flight" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profil',
          tabBarIcon: ({focused, color, size}) => {
            return <FontAwesome name="user" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TabStack;
