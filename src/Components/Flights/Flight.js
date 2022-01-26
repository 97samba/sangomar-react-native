import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Pressable,
  Text,
  View,
  VStack,
  ZStack,
} from 'native-base';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DashedLine from 'react-native-dashed-line';
import moment from 'moment';
import Dash from 'react-native-dash';
moment.locale('fr', {
  months:
    'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
      '_',
    ),
  monthsShort:
    'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact: true,
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number) {
    return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse: /PD|MD/,
  isPM: function (input) {
    return input.charAt(0) === 'M';
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? 'PD' : 'MD';
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
});

const Notch = () => {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      position="absolute"
      top="45%"
      width="100%">
      <View
        left={-1}
        width={3}
        height={5}
        border={1}
        borderLeftColor="white"
        borderColor="gray.200"
        borderRightRadius={50}
        overflow="hidden"
        bg="trueGray.100"></View>
      {/* <Divider width="80%" borderStyle="dotted" /> */}
      <View
        right={-1}
        width={3}
        height={5}
        border={1}
        borderColor="gray.200"
        borderLeftRadius={50}
        // position="absolute"
        // top="50%"
        // right={-35}
        bg="trueGray.100"></View>
    </HStack>
  );
};
const NewFlight = ({item, navigation}) => {
  const getWeight = () => {
    var weight = 0;
    item.valise.map(valise => (weight += valise.poids));
    return weight + ' kg';
  };
  return (
    <Pressable onPress={() => navigation.navigate('FlightDescription', item)}>
      <VStack
        p={4}
        bg="white"
        rounded={10}
        my={2}
        // space={1}
        border={0.1}
        shadow={1}
        borderColor="gray.200">
        <HStack>
          {/**left */}
          <VStack flex={2}>
            <Heading size="sm" fontWeight="500" color="blueGray.500">
              NYC
            </Heading>
            <Heading size="xs" color="trueGray.400" fontWeight={500}>
              New York
            </Heading>
          </VStack>
          {/**Middle */}
          <VStack flex={1} alignItems="center">
            <HStack alignItems="center" justifyContent="space-between">
              <FontAwesome name="dot-circle-o" size={13} color="#69c1f7" />
              <Dash
                style={{width: 20, marginHorizontal: 5}}
                dashColor="gray"
                dashGap={2}
                dashThickness={1}
              />
              <MaterialIcon
                style={{rotation: 90}}
                name="flight"
                size={20}
                color="#69c1f7"
              />
              <Dash
                style={{width: 20, marginHorizontal: 5}}
                dashColor="gray"
                dashGap={2}
                dashThickness={1}
              />

              <FontAwesome name="dot-circle-o" size={13} color="#69c1f7" />
            </HStack>
            <HStack space={2} alignItems="center">
              <FontAwesome name="suitcase" size={13} color="gray" />
              <Text fontSize={13}>{getWeight()}</Text>
            </HStack>
          </VStack>
          {/**Right */}
          <VStack flex={2} alignItems="flex-end">
            <Heading size="sm" fontWeight="500" color="blueGray.500">
              LDN
            </Heading>
            <Heading size="xs" color="trueGray.400" fontWeight={500}>
              London
            </Heading>
          </VStack>
        </HStack>
        <ZStack justifyContent="space-between">
          <View
            bg="coolGray.100"
            size="5"
            overflow="hidden"
            left={-25}
            rounded={50}
            border={1}
            borderColor="coolGray.200"
          />
          <View
            bg="coolGray.100"
            size="5"
            right={-25}
            rounded={50}
            border={1}
            borderColor="coolGray.200"
          />
        </ZStack>
        <HStack alignItems="center" mt={2}>
          <DashedLine
            style={{minHeight: 15, height: 15, width: '100%'}}
            axis="horizontal"
            dashLength={10}
            dashThickness={2}
            dashGap={5}
            dashColor="#f2f2f2"
          />
        </HStack>
        <HStack alignItems="center">
          {/**left */}
          <VStack flex={2}>
            <Avatar
              bg="blueGray.300"
              _text={{fontSize: 12, color: 'gray.600'}}
              size={7}>
              <MaterialIcon name="person" size={10} color="gray" />
            </Avatar>

            <Heading size="xs" color="trueGray.400" fontWeight={500}>
              {item.publisher.firstName}
            </Heading>
          </VStack>
          {/**Middle */}

          <VStack flex={2} alignItems="center">
            <Heading size="sm" fontWeight="500" color="blueGray.500">
              {moment(item.departureDate.toDate()).format('ll')}
            </Heading>
            <Heading size="xs" color="trueGray.400" fontWeight={500}>
              Date départ
            </Heading>
          </VStack>
          {/**Right */}
          <VStack flex={2} alignItems="flex-end">
            <Heading
              size="sm"
              fontWeight="500"
              color="white"
              bg="green.400"
              rounded="lg"
              py={1}
              px={2}>
              {item.pricePerKg} {item.currency} $
            </Heading>
            {/* <Heading size="xs" color="trueGray.400" fontWeight={500}>
              Prix
            </Heading> */}
          </VStack>
        </HStack>
      </VStack>
    </Pressable>
  );
};
const NormalFlight = ({item, navigation}) => {
  const getWeight = () => {
    var weight = 0;
    item.valise.map(valise => (weight += valise.poids));
    return weight + ' kg';
  };
  return (
    <Pressable onPress={() => navigation.navigate('FlightDescription', item)}>
      <Box my={1} bg="white" rounded={5} shadow={(1, 0, 0, 1)}>
        <Notch />
        <VStack p={4} space={4}>
          <HStack space={4} justifyContent="space-between">
            <VStack>
              <Heading fontSize={20} color="blueGray.600">
                {item.departure.charAt(0).toUpperCase() +
                  item.departure.slice(1)}
              </Heading>
              <HStack space={2}>
                <MaterialIcon name="flight-takeoff" size={15} color="gray" />
                <Text fontSize={13}>
                  {moment(item.departureDate.toDate()).format('D MMM')}
                </Text>
              </HStack>
            </VStack>
            <VStack justifyContent="center" alignItems="center">
              <HStack alignItems="center" space={2}>
                <Divider width={10} size={3} />
                <Ionicon
                  // name="arrow-forward-circle-outline"
                  name="airplane"
                  size={20}
                  color="gray"
                />
                <Divider width={10} size={3} />
              </HStack>
              <HStack space={2} alignItems="center">
                <FontAwesome name="suitcase" size={13} color="gray" />
                <Text fontSize={13}>{getWeight()}</Text>
              </HStack>
            </VStack>
            <VStack>
              <Heading fontSize={20} color="blueGray.600">
                {item.destination.charAt(0).toUpperCase() +
                  item.destination.slice(1)}
              </Heading>
              <HStack space={2}>
                <MaterialIcon name="flight-land" size={15} color="gray" />
                <Text fontSize={13}>
                  {moment(item.distributionDate.toDate()).format('D MMM')}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Avatar
                bg="blueGray.300"
                _text={{fontSize: 12, color: 'gray.600'}}
                size={8}>
                {item.departure[0]}
              </Avatar>
              <HStack space={1}>
                {/* <Text fontSize="xs">{item.contacts.gp.firstName}</Text> */}

                <Text fontSize="xs">{item.publisher.firstName}</Text>
                <FontAwesome name="check-circle" size={14} color="gray" />
              </HStack>
            </VStack>
            <HStack
              space={5}
              p={2}
              rounded={5}
              border={0.5}
              borderColor="blueGray.500">
              <FontAwesome name="phone" size={16} color="gray" />
              <FontAwesome name="whatsapp" size={16} color="gray" />
              <FontAwesome name="info" size={16} color="gray" />
            </HStack>

            <Heading size="md" color="amber.300">
              {item.pricePerKg} {item.currency} <Text fontSize={12}>/kg</Text>
            </Heading>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

const ReservedFlight = ({navigation, informations, item}) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ReservationView', {
          item: item,
          informations: informations,
        })
      }>
      <Box p={2} my={2} bg="white" rounded={5} shadow={0.9}>
        <HStack justifyContent="space-between" flex={1}>
          <Heading size="xs" color="trueGray.300" flex={1}>
            {moment(item.departureDate.toDate()).format('ll')}
          </Heading>
          <Box p={1} px={2} rounded={5} bg="trueGray.50" flex={1}>
            {informations.shipping ? (
              <Text color="green.500" textAlign="center">
                Confirmée
              </Text>
            ) : (
              <Text color="yellow.500" textAlign="center">
                En attente
              </Text>
            )}
          </Box>
          <HStack justifyContent="flex-end" flex={1}>
            <Heading size="sm" color="gold" fontWeight="400">
              ${' '}
            </Heading>
            <Heading size="md" color="blueGray.500" fontWeight="500">
              {informations.price}
            </Heading>
          </HStack>
        </HStack>
        <HStack>
          {/* <Text>Left side</Text> */}
          <VStack justifyContent="center" alignItems="center" space={1}>
            <FontAwesome name="dot-circle-o" size={20} color="gray" />
            <DashedLine
              style={{minHeight: 15, height: 15}}
              axis="vertical"
              dashLength={5}
              dashThickness={2}
              dashGap={4}
              dashColor="gray"
            />
            <MaterialIcon
              style={{rotation: 180}}
              name="flight"
              size={20}
              color="gray"
            />
            <DashedLine
              style={{minHeight: 15, height: 15}}
              axis="vertical"
              dashLength={5}
              dashThickness={2}
              dashGap={4}
              dashColor="gray"
            />

            <FontAwesome5 name="dot-circle" size={20} color="gray" />
          </VStack>

          {/* <Text>right side</Text> */}
          <HStack px={3} flex={1} space={1}>
            <VStack justifyContent="space-between" flex={1}>
              <Box>
                <Heading size="xs" color="blueGray.400" fontWeight={400}>
                  Départ
                </Heading>
                <Heading size="md" color="trueGray.600" fontWeight={600}>
                  {item.departure}
                </Heading>
              </Box>
              <Box>
                <Heading size="xs" color="trueGray.400" fontWeight={400}>
                  Destination
                </Heading>
                <Heading size="md" color="trueGray.600" fontWeight={600}>
                  {item.destination}
                </Heading>
              </Box>
            </VStack>
            <VStack flex={1} mt={1} space={2} justifyContent="center">
              <HStack space={1} alignItems="center">
                <FontAwesome name="suitcase" size={17} color="gray" />
                <Heading ml={1} size="sm" color="trueGray.600" fontWeight={400}>
                  {informations.weight} kg
                </Heading>
              </HStack>
              <HStack space={1} alignItems="center">
                <FontAwesome5 name="shipping-fast" size={17} color="gray" />
                <Heading size="sm" color="trueGray.600" fontWeight={400}>
                  {informations.shipping ? 'Livraison Oui' : 'Livraison Non'}
                </Heading>
              </HStack>
              <HStack space={1} alignItems="center">
                <FontAwesome name="user" size={20} color="gray" />
                <Heading ml={2} size="sm" color="trueGray.600" fontWeight={400}>
                  {item.publisher.firstName}
                </Heading>
              </HStack>
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

const Flights = ({item, navigation, informations, type = 'normal'}) => {
  return (
    <View>
      {type === 'reserved' ? (
        <ReservedFlight
          navigation={navigation}
          informations={informations}
          item={item}
        />
      ) : (
        <NewFlight navigation={navigation} item={item} />
      )}
    </View>
  );
};
export default Flights;
