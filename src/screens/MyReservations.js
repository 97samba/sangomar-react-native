import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  NativeBaseProvider,
  Text,
  VStack,
  Button,
  IconButton,
  Icon,
  Input,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from '../Navigation/AuthenticationProvider';
import Flights from '../Components/Flights/Flight';
import {Pressable} from 'react-native';

const MyReservations = ({navigation}) => {
  const {user} = useContext(AuthenticationContext);
  const [flights, setFlights] = useState([]);
  const [loadingReservations, setloadingReservations] = useState(true);

  const getMyReservations = async () => {
    setloadingReservations(true);
    const reservations = await firestore()
      .collection('reservations')
      .where('userId', '==', user.uid)
      .get()
      .then(query => {
        var newState = [];
        query.docs.forEach(doc => newState.push(doc.data()));
        console.log(`newState`, query.docs);
        return newState;
      });

    await firestore()
      .collection('flights')
      .where(
        '__name__',
        'in',
        reservations.map(reservation => reservation.flightId),
      )
      .get()
      .then(query => {
        var newState = [];
        reservations.forEach(reservation => {
          query.docs.forEach(doc => {
            if (doc.id === reservation.flightId) {
              newState.push({
                flight: doc.data(),
                informations: reservation,
              });
            }
          });
        });
        setFlights(newState);
        setloadingReservations(false);
      });
  };

  useEffect(async () => {
    getMyReservations();
  }, []);

  return (
    <NativeBaseProvider>
      <VStack bg="trueGray.100" flex={1}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          p={3}
          flex={1}>
          <Heading size="lg" fontWeight="500" color="blueGray.600">
            Mes réservations
          </Heading>
          <Avatar bg="trueGray.200" _text={{color: 'blueGray.600'}}>
            SN
          </Avatar>
        </HStack>
        <HStack p={3} alignContent="center" flex={1} space={1}>
          <VStack
            flex={2}
            bg="blueGray.200"
            rounded={5}
            justifyContent="center">
            <Pressable onPress={() => console.log('filter')}>
              <Heading
                size="sm"
                color="trueGray.500"
                fontWeight="500"
                py={2}
                px={4}>
                Filtrer
              </Heading>
            </Pressable>
          </VStack>
          <Box flex={7}>
            <Input
              isFullWidth
              variant="unstyled"
              placeholder="Recherche"
              bg="white"
            />
          </Box>
          <Pressable onPress={getMyReservations} flex={1}>
            <VStack flex={1} justifyContent="center" alignContent="center">
              <MaterialIcons name="refresh" size={25} color="gray" />
            </VStack>
          </Pressable>
        </HStack>

        <VStack px={4} flex={11}>
          {loadingReservations ? (
            <VStack flex={1} justifyContent="center" alignItems="center">
              <Text>Chargement des réservations</Text>
            </VStack>
          ) : flights.length > 0 ? (
            <FlatList
              data={flights.sort(
                (a, b) =>
                  b.informations.reservationDate -
                  a.informations.reservationDate,
              )}
              renderItem={({item}) => (
                <Flights
                  item={item.flight}
                  informations={item.informations}
                  navigation={navigation}
                  type="reserved"
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text>No flights</Text>
          )}
        </VStack>
      </VStack>
    </NativeBaseProvider>
  );
};

export default MyReservations;
