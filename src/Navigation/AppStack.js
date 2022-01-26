import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from './TabStack';
import TicketViewer from '../screens/ProfileViews/TicketViewer';
import FlightDescription from '../Components/Main/FlightDescription';
import ReservedView from '../Components/Main/ReservedView';
import CheckOut from '../screens/CheckOut';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Ticket"
        component={TicketViewer}
        options={{title: 'Réservation AA 1129'}}
      />
      <Stack.Screen
        name="FlightDescription"
        options={{title: 'Réservation'}}
        component={FlightDescription}
      />
      <Stack.Screen
        name="ReservationView"
        options={{title: 'Réservations', headerShown: false}}
        component={ReservedView}
      />
      <Stack.Screen
        name="CheckOut"
        options={{title: 'Paiement'}}
        component={CheckOut}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
