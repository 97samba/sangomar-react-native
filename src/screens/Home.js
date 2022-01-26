import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  NativeBaseProvider,
  Text,
  VStack,
  Divider,
  Input,
  Image,
  View,
  FormControl,
  Avatar,
  Center,
  Pressable,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Flights from '../Components/Flights/Flight';
import firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from '../Navigation/AuthenticationProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  const {user} = useContext(AuthenticationContext);
  return (
    <VStack flex={2} bg="trueGray.100" p={5}>
      <VStack>
        <HStack justifyContent="space-between">
          <VStack>
            <Text fontSize="2xl">Où voulez-vous</Text>
            <Text fontSize="2xl">
              envoyer un{' '}
              <Text bold fontSize="3xl">
                colis ?
              </Text>{' '}
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Avatar bg="trueGray.300">SN</Avatar>
            <Heading size="xs" fontWeight="400">
              {user.displayName.split(' ')[0]}
            </Heading>
          </VStack>
        </HStack>
        <HStack flex={1}>
          <Box width="100%" mt={2} bg="white" px={2} py={1} rounded={10}>
            <FormControl>
              <Input
                placeholder="Départ"
                variant="unstyled"
                isFullWidth
                bg="white"
                fontSize={16}
                InputLeftElement={
                  <MaterialIcons
                    name="flight-takeoff"
                    color="gray"
                    size={25}
                    style={{marginHorizontal: 10}}
                  />
                }
              />
            </FormControl>
            <Divider size={0.7} />

            <FormControl>
              <Input
                // mt={2}
                fontSize={16}
                placeholder="Destination"
                variant="unstyled"
                isFullWidth
                bg="white"
                InputLeftElement={
                  <MaterialIcons
                    name="flight-land"
                    color="gray"
                    size={25}
                    style={{marginHorizontal: 10}}
                  />
                }
              />
            </FormControl>
          </Box>
        </HStack>
        <HStack flex={1} my={2} alignItems="center" space={2}>
          <Button bg="white" rounded={10} flex={3}>
            <Heading size="sm" fontWeight="500" color="trueGray.600">
              22 octobre 2021
            </Heading>
          </Button>
          {/* <Pressable flex={1} p={2} bg="white">
            <FontAwesome name="exchange" size={20} color="gray" />
          </Pressable> */}
          <Button
            flex={2}
            bg="blueGray.300"
            endIcon={<FontAwesome name="search" size={17} color="white" />}>
            <Heading size="sm" color="trueGray.500" fontWeight="500">
              Rechercher
            </Heading>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

const Publications = ({loading, recent, navigation}) => {
  return (
    <VStack mt={2} flex={2}>
      <HStack justifyContent="space-between" alignItems="center" px={5}>
        <Heading size="md">Publications récentes</Heading>
        <Button variant="ghost" size="md" _text={{color: 'blueGray.500'}}>
          voir
        </Button>
      </HStack>
      <HStack pl={2}>
        {!loading ? (
          <FlatList
            horizontal
            data={recent}
            renderItem={({item}) => (
              <Box m={2}>
                <Flights
                  item={{...item.data(), id: item.id}}
                  navigation={navigation}
                />
              </Box>
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Box p={10} shadow={5} bg="white" width="100%">
            <Text>chargement</Text>
          </Box>
        )}
      </HStack>
    </VStack>
  );
};

const Destinations = ({popularDestinations, navigation}) => {
  return (
    <Box flex={2}>
      <VStack>
        <HStack px={5} justifyContent="space-between" alignItems="center">
          <Heading size="md">Destinations Populaires</Heading>
          <Button variant="ghost" size="md" _text={{color: 'blueGray.500'}}>
            voir
          </Button>
        </HStack>
        <Box ml={5} mb={2}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularDestinations}
            renderItem={({item}) => (
              <View rounded={2} mr={2} p={2} style={{width: 100, height: 130}}>
                <Image
                  source={
                    item.key % 2 === 0
                      ? require(`../assets/espagne.jpg`)
                      : require(`../assets/paris-France.jpg`)
                  }
                  resizeMode="cover"
                  alt="image"
                  width={100}
                  height={130}
                  position="absolute"
                  rounded={5}
                />
                <VStack
                  position="absolute"
                  width={100}
                  height={130}
                  justifyContent="flex-end">
                  <HStack
                    justifyContent="space-between"
                    px={1}
                    width={100}
                    height={7}
                    style={{backgroundColor: 'rgba(52, 52, 52, 0.4)'}}>
                    <Text color="white">{item.name}</Text>
                    <Text color="white">{item.flights} </Text>
                  </HStack>
                </VStack>
              </View>
            )}
          />
        </Box>
      </VStack>
    </Box>
  );
};
const Home = ({navigation}) => {
  const [popularDestinations, setpopularDestinations] = useState([
    {
      name: 'Paris',
      picture: 'primary.200',
      flights: 5,
      image: 'paris-France.jpg',
      key: 1,
    },
    {
      name: 'Marseille',
      picture: 'primary.200',
      image: 'espagne.jpg',

      flights: 4,
      key: 2,
    },
    {
      name: 'Dakar',
      picture: 'primary.200',
      image: 'paris-France.jpg',

      flights: 24,
      key: 3,
    },
    {
      name: 'Bandjul',
      picture: 'primary.200',
      image: 'paris-France.jpg',

      flights: 24,
      key: 4,
    },
    {
      name: 'Abidjan',
      picture: 'primary.200',
      flights: 24,
      key: 5,
    },
  ]);
  const [recent, setrecent] = useState([]);
  const [loadingRecent, setloadingRecent] = useState(true);

  // useEffect(async () => {
  //   await firestore()
  //     .collection('flights')
  //     .get()
  //     .then(querySnapshot => {
  //       setrecent(querySnapshot.docs);
  //       setloadingRecent(false);
  //     });
  //   // return () => {
  //   //   setloadingRecent(false);
  //   // };
  // }, []);

  return (
    <NativeBaseProvider>
      {/* <Heading>Home</Heading> */}
      <ScrollView flex={1}>
        <VStack flex={1} bg="trueGray.100">
          <Header />
          <Destinations popularDestinations={popularDestinations} />
          <Publications
            loading={loadingRecent}
            recent={recent}
            navigation={navigation}
          />
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Home;
