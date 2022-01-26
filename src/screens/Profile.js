import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Heading,
  HStack,
  NativeBaseProvider,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthenticationContext} from '../Navigation/AuthenticationProvider';
import {Pressable, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Flights from '../Components/Flights/Flight';
import firestore from '@react-native-firebase/firestore';
import {Dimensions} from 'react-native';

const Flightss = ({item, navigation}) => {
  return (
    <Pressable onPress={() => navigation.navigate('Ticket', item)}>
      <Box
        mb={2}
        bg="white"
        rounded={5}
        shadow={1}
        border={1}
        borderColor="gray.200">
        <HStack
          justifyContent="space-between"
          alignItems="center"
          position="absolute"
          top="40%"
          width="100%">
          <View
            left={-10}
            width={5}
            height={5}
            border={1}
            borderColor="gray.200"
            rounded={50}
            overflow="hidden"
            bg="trueGray.100"></View>
          {/* <Divider width="80%" borderStyle="dotted" /> */}
          <View
            right={-10}
            width={5}
            height={5}
            border={1}
            borderColor="gray.200"
            // position="absolute"
            // top="50%"
            rounded={50}
            // right={-35}
            bg="trueGray.100"></View>
        </HStack>

        <Box p={3}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="lg" color="primary.600">
              {item.price} {item.currency}
            </Heading>
            <HStack alignItems="center">
              <MaterialIcons name="flight-takeoff" color="gray" size={20} />

              <Text fontSize={18} fontWeight="bold" color="blueGray.500">
                {' '}
                {item.from}
              </Text>
              <Divider width={10} mx={2} size={2} />
              <Text fontSize={18} fontWeight="bold" color="blueGray.500" mr={1}>
                {item.to}
              </Text>
              <MaterialIcons name="flight-land" color="gray" size={20} />
            </HStack>
          </HStack>

          <HStack justifyContent="space-between" mt={5}>
            <VStack>
              <Text bold>Départ </Text>
              <Text>{item.departure}</Text>
            </VStack>
            <VStack>
              <Text bold>Dernier dépot</Text>
              <Text>{item.distribution}</Text>
            </VStack>
            <VStack>
              <Text bold>Vol</Text>
              <Text>{item.flightMode}</Text>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
};

const Comments = ({item}) => {
  return (
    <Box bg="white" rounded={(5, 5, 5, 5)} mt={3} p={4}>
      <HStack space={2}>
        <Avatar bg="blueGray.400">{`${item.userFirstName[0]}${item.userLastName[0]}`}</Avatar>
        <VStack>
          <Text>
            {item.userFirstName} {item.userLastName}
          </Text>
          <HStack>
            {['1', '2', '3', '4', '5'].map((element, index) => (
              <FontAwesome
                name="star"
                size={15}
                color={index < item.rating ? 'gold' : 'gray'}
                key={index}
              />
            ))}
          </HStack>
          <Text style={{fontSize: 12, fontWeight: '300'}}>
            {item.created_at}
          </Text>
        </VStack>
      </HStack>
      <Text pt={2}>{item.notes}</Text>
    </Box>
  );
};
const Profile = ({navigation}) => {
  const {logOut, user} = useContext(AuthenticationContext);
  const [route, setroute] = useState({
    firstName: 'Samba',
    lastName: 'NDIAYE',
    location: 'Paris',
    followers: 23,
    flights: [
      {
        from: 'Paris',
        to: 'Dakar',
        firstName: 'Ibrahima',
        lastName: 'Faye',
        price: 10,
        currency: '€ ',
        departure: '10/10/2021',
        distribution: '10/10/2021',
        flightMode: 'Direct',
        picture: 'primary.200',
        flights: 5,
        key: 1,
      },
      {
        from: 'London',
        to: 'Dakar',
        firstName: 'Ibrahima',
        lastName: 'Faye',
        price: 8,
        currency: '£',
        departure: '10/10/2021',
        distribution: '10/10/2021',
        flightMode: 'Direct',
        picture: 'primary.200',
        flights: 15,
        key: 2,
      },
    ],
    reviews: [
      {
        userFirstName: 'John',
        userLastName: 'Doe',
        rating: 5,
        notes:
          'Personne trés sérieuse, acceuil chaleureux à dakar, je recommande.',
        created_at: '25/08/2021',
      },
      {
        userFirstName: 'Marie',
        userLastName: 'Doe',
        rating: 3,
        notes:
          'Personne trés sérieuse, acceuil chaleureux à dakar, je recommande.',
        created_at: '25/08/2021',
      },
    ],
  });
  const [myFlights, setmyFlights] = useState([]);
  const [loadingMyFlights, setloadingMyFlights] = useState(true);

  useEffect(async () => {
    try {
      await firestore()
        .collection('flights')
        .where('publisher.id', '==', user.uid)
        .get()
        .then(querySnapshot => {
          setmyFlights(querySnapshot.docs);
          console.log(`query`, querySnapshot.size);
          setloadingMyFlights(false);
        })
        .catch(e => console.log(`erreur`, e));
    } catch (e) {
      console.log(`erreur`, e);
    }
  }, []);

  const Header = ({user}) => {
    return (
      <Box bg="white" pb={3} rounded={(0, 0, 0, 15)}>
        <HStack m={5} height={70}>
          <VStack flex={1}>
            <Heading>{user.displayName}</Heading>
            <HStack>
              <Ionicon name="location" size={20} color="gray" />
              <Text size="sm" color="gray.500">
                {route.location}
              </Text>
            </HStack>
          </VStack>
          <VStack alignItems="center">
            <Avatar bg="gray.300" size={12}>
              SN
            </Avatar>
          </VStack>
        </HStack>
        <Center>
          <HStack space={5}>
            <Button
              variant="solid"
              size="lg"
              px={10}
              bg="blueGray.400"
              _text={{color: 'white'}}
              startIcon={<Ionicon name="person-add" size={20} color="white" />}>
              Suivre
            </Button>
            <Button
              _text={{color: 'white'}}
              bg="amber.600"
              startIcon={<AntDesign name="message1" size={20} color="white" />}
              size="lg"
              px={10}>
              Message
            </Button>
          </HStack>
        </Center>
        <Divider my={5} size={1} bg="dark.600" />
        <HStack justifyContent="space-around" px={10}>
          <VStack alignItems="center">
            <Text>1500</Text>
            <Text color="gray.400">Abonnés</Text>
          </VStack>
          <VStack alignItems="center">
            <Text>9 / 10</Text>
            <Text color="gray.400">Note</Text>
          </VStack>
          <VStack alignItems="center">
            <Text>19</Text>
            <Text color="gray.400">Vols</Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack flex={1}>
          <Header user={user} />
          <VStack p={5}>
            <Heading size="md" color="blueGray.600" mb={2}>
              Mes vols
            </Heading>
            {loadingMyFlights ? (
              <Center>
                <Text>Chargement</Text>
              </Center>
            ) : (
              <FlatList
                data={myFlights}
                horizontal
                renderItem={({item}) => (
                  <Box m={1}>
                    <Flights item={item.data()} navigation={navigation} />
                  </Box>
                )}
                ListEmptyComponent={
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text>Vous n'avez pas de vol plannifiés</Text>
                    <Button variant="ghost">Publier </Button>
                  </HStack>
                }
                showsHorizontalScrollIndicator={false}
              />
            )}
          </VStack>
          <VStack p={5}>
            <Heading size="md" color="blueGray.600">
              Notes et commentaires
            </Heading>
            <FlatList
              data={route.reviews}
              horizontal
              nestedScrollEnabled={true}
              renderItem={({item}) => (
                <Box m={2}>
                  <Comments item={item} />
                </Box>
              )}
            />
          </VStack>
          <Center mb={4}>
            <Button
              onPress={logOut}
              bg="red.500"
              _text={{color: 'white'}}
              endIcon={<MaterialIcons name="logout" size={15} color="white" />}>
              Se déconnecter
            </Button>
          </Center>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Profile;
