import {
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Heading,
  HStack,
  Input,
  NativeBaseProvider,
  Select,
  Text,
  VStack,
} from 'native-base';
import React, {useContext, useState, createContext} from 'react';
import Flights from '../Components/Flights/Flight';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Pressable} from 'react-native';
import moment from 'moment';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {findResults} from '../utils/Middlewares/SearchMiddleware';
import DateTimePicker from '@react-native-community/datetimepicker';

const googleApiKeys = 'AIzaSyAX0YkjIk2rljrKmWZRKfwbq4R7XP189Oc';
const SearchMenu = () => {
  const [error, seterror] = useState(false);
  const {
    departure,
    destination,
    setsearching,
    setdestination,
    setdeparture,
    setresults,
    setloading,
    bagageType,
    setbagageType,
    date,
    setdate,
  } = useContext(ResearchContext);
  const handleResults = async () => {
    if (departure === '' && destination === '') {
      seterror(true);
      return;
    }
    error && seterror(false);
    setloading(false);

    setresults(
      await findResults(departure, destination, date, 'suitcase', 'promo'),
    );
    setsearching(false);
  };
  const [dateModalOpen, setdateModalOpen] = useState(false);

  const permutCities = () => {
    var newDeparture = destination;
    var newDestination = departure;

    setdeparture(newDeparture);
    setdestination(newDestination);
  };
  return (
    <Box flex={1}>
      <VStack p={5}>
        <HStack justifyContent="space-between">
          {error ? (
            <Text color="red.600" flex={9}>
              {' '}
              !! Veuillez renseigner une ville SVP
            </Text>
          ) : (
            <Text textAlign="center" flex={9}>
              Recherche
            </Text>
          )}

          <Box flex={1}>
            <Pressable onPress={() => setsearching(false)}>
              <MaterialIcon name="close" size={20} color="gray" />
            </Pressable>
          </Box>
        </HStack>
        {/* <Box mb={10}>
          <GooglePlacesAutocomplete
            placeholder="Départ"
            query={{key: googleApiKeys, language: 'fr'}}
            styles={{}}
            onPress={(data, details) => console.log(`data`, data)}
          />
        </Box> */}
        <Heading mt={2} size="lg" color="pink.700" fontWeight="400">
          Envoyer votre colis !
        </Heading>
        <Box my={4} p={2} rounded={10} bg="white">
          <HStack justifyContent="space-between" mt={2} mx={4}>
            <Text fontSize={15} color="pink.800">
              Départ
            </Text>
            <Fontisto name="navigate" size={18} color="gray" />
          </HStack>
          <Input
            placeholder="Ville de départ"
            size="xl"
            variant="unstyled"
            color="blueGray.600"
            onChangeText={value => setdeparture(value)}
            value={departure}
          />

          <HStack
            justifyContent="center"
            // bg="gray.300"
            position="absolute"
            top="53%"
            left={4}
            felx={1}>
            <Divider flex={5} />
            <Box flex={1}>
              <Pressable onPress={permutCities}>
                <AntDesign
                  style={{rotation: 90}}
                  name="swap"
                  size={30}
                  color="gray"
                />
              </Pressable>
            </Box>
          </HStack>
          <Text mt={2} ml={4} fontSize={15} color="pink.800">
            Destination
          </Text>
          <Input
            placeholder="Ville d'arrivée"
            size="xl"
            variant="unstyled"
            color="blueGray.600"
            onChangeText={value => setdestination(value)}
            value={destination}
          />
        </Box>
        <Box rounded={10} bg="white" px={5} py={3}>
          <Text color="pink.800">Date</Text>
          <Pressable onPress={() => setdateModalOpen(true)}>
            <HStack mt={2} alignItems="center" justifyContent="space-between">
              <Heading size="md" fontWeight="400" color="blueGray.600">
                {moment(date).format('LL')}
              </Heading>
              <AntDesign name="calendar" size={25} color="gray" />
            </HStack>
          </Pressable>
          {dateModalOpen ? (
            <DateTimePicker
              value={date}
              testID="date"
              onChange={(e, date) => {
                setdate(date), setdateModalOpen(false);
              }}
              mode="datetime"
            />
          ) : null}
        </Box>
        <Box mt={4} rounded={10} bg="white" px={5} py={2}>
          <HStack p={1} alignItems="center">
            <Text flex={1} color="pink.800">
              Type
            </Text>
            <HStack flex={1} justifyContent="space-between">
              <Pressable onPress={() => setbagageType('box')}>
                <VStack
                  p={2}
                  width={20}
                  rounded={5}
                  bg={bagageType === 'box' ? 'gray.200' : 'white'}
                  alignItems="center">
                  <FontAwesome5Icon name="box-open" size={20} color="gray" />
                  <Text>Colis</Text>
                </VStack>
              </Pressable>
              <Pressable onPress={() => setbagageType('suitcase')}>
                <VStack
                  p={2}
                  width={20}
                  rounded={5}
                  alignItems="center"
                  bg={bagageType === 'suitcase' ? 'gray.200' : 'white'}>
                  <FontAwesome5Icon name="suitcase" size={20} color="gray" />
                  <Text>Valise</Text>
                </VStack>
              </Pressable>
            </HStack>
          </HStack>
        </Box>
        <HStack mt={5} justifyContent="space-between">
          <Text color="blueGray.600">Code promo</Text>
          <MaterialIcon name="add" size={25} color="gray" />
        </HStack>
        <Divider my={3} color="dark.300" size={2} flexGrow={1} />
        <Button
          onPress={handleResults}
          _pressed={{bg: 'pink.600'}}
          bg="pink.800"
          _text={{color: 'white'}}>
          Rechercher
        </Button>
      </VStack>
    </Box>
  );
};

const SearchHeader = ({searchResults}) => {
  const {destination, departure, setsearching} = useContext(ResearchContext);
  return (
    <Box mt={3}>
      <HStack space={2} bg="white" rounded={5} p={4} alignItems="center">
        <Pressable flex={2} onPress={() => setsearching(true)}>
          <HStack space={3} alignItems="center">
            <MaterialIcon
              name="flight-takeoff"
              size={20}
              color="gray"
              style={{marginLeft: 5}}
            />
            {departure != '' ? (
              <Text>{departure}</Text>
            ) : (
              <Text color="trueGray.400">Départ...</Text>
            )}
          </HStack>
        </Pressable>
        <Pressable onPress={() => console.log('swap')}>
          <AntDesign name="swap" size={20} color="gray" />
        </Pressable>
        <Pressable flex={2} onPress={() => setsearching(true)}>
          <HStack space={3} justifyContent="flex-end" alignItems="center">
            {destination != '' ? (
              <Text>{destination}</Text>
            ) : (
              <Text color="trueGray.400">Destination...</Text>
            )}

            <MaterialIcon
              name="flight-land"
              size={20}
              color="gray"
              style={{marginRight: 5}}
            />
          </HStack>
        </Pressable>
      </HStack>
      <HStack py={1}>
        <HStack flex={1} alignItems="center" space={2}>
          <Select
            h={10}
            selectedValue="price"
            flex={1}
            size="sm"
            variant="unstyled">
            <Select.Item label="Prix" value="price" />
            <Select.Item label="Date" value="date" />
          </Select>
        </HStack>
        <HStack
          flex={3}
          justifyContent="flex-end"
          space={2}
          alignItems="center">
          <Text color="gray.500">Filtrer</Text>
          <Box bg="blueGray.200" p={1} rounded={20}>
            <MaterialIcon name="filter-list" size={20} color="gray" />
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};

export const ResearchContext = createContext();

const SearchResults = ({navigation}) => {
  const [loading, setloading] = useState(true);
  const [results, setresults] = useState([]);
  const [searching, setsearching] = useState(true);
  const [departure, setdeparture] = useState('dakar');
  const [bagageType, setbagageType] = useState('box');
  //   const [departure, setdeparture] = useState('Dakar, Sénégal');
  const [destination, setdestination] = useState('Paris');
  const [date, setdate] = useState(new Date());

  const Main = () => {
    return (
      <VStack flex={1}>
        <VStack mx={5} flex={1}>
          <FlatList
            style={{flex: 1}}
            ListHeaderComponent={<SearchHeader searchResults={results} />}
            // ListFooterComponent={

            // }
            data={results}
            renderItem={({item}) =>
              loading ? (
                <Box>
                  <Text>test</Text>
                </Box>
              ) : (
                <Flights
                  item={{...item.data(), id: item.id}}
                  navigation={navigation}
                />
              )
            }
            showsVerticalScrollIndicator={false}
          />
          <Center m={2}>
            <HStack space={2}>
              <Text>Fast GP</Text>
              <MaterialIcon
                name="local-fire-department"
                size={20}
                color="gray"
              />
            </HStack>
          </Center>
        </VStack>
      </VStack>
    );
  };

  return (
    <NativeBaseProvider>
      <ResearchContext.Provider
        value={{
          departure,
          setdeparture,
          destination,
          setdestination,
          setsearching,
          setresults,
          setloading,
          bagageType,
          setbagageType,
          date,
          setdate,
        }}>
        {searching ? <SearchMenu /> : <Main />}
      </ResearchContext.Provider>
    </NativeBaseProvider>
  );
};

export default SearchResults;
