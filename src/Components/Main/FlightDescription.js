import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  NativeBaseProvider,
  Text,
  VStack,
  Radio,
  Checkbox,
  Modal,
} from 'native-base';
import React, {createContext, useContext, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {calculatePricePerKG} from '../../utils/Middlewares/FlighDescriptionMiddleware';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {AuthenticationContext} from '../../Navigation/AuthenticationProvider';
import moment from 'moment';
import BagagesAndQuantity from '../FlightDescriptionComponents/BagagesAndQuantity';
import Dash from 'react-native-dash';

const Countries = ({route}) => {
  return (
    <Box bg="white" p={5} rounded={10}>
      <HStack justifyContent="space-between">
        <Heading size="xs" fontWeight="400" color="trueGray.400">
          Départ
        </Heading>
        <Heading size="xs" fontWeight="400" color="trueGray.400">
          Destination
        </Heading>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Heading color="blueGray.500" size="xl">
            {route.params.departure}
          </Heading>

          {/* <Divider mt={2} size={2} /> */}
        </VStack>

        <VStack>
          <Heading color="blueGray.500" size="xl">
            {route.params.destination}
          </Heading>

          {/* <Divider mt={2} size={2} /> */}
        </VStack>
      </HStack>
      <HStack alignItems="center" justifyContent="space-between" px={5} my={2}>
        <FontAwesome name="dot-circle-o" size={20} color="#69c1f7" />
        <Dash
          style={{width: 20, marginHorizontal: 5, flex: 1}}
          dashColor="gray"
          dashGap={6}
          dashThickness={2}
        />
        <MaterialIcon
          style={{rotation: 90}}
          name="flight"
          size={30}
          color="#69c1f7"
        />
        <Dash
          style={{width: 20, marginHorizontal: 5, flex: 1}}
          dashColor="gray"
          dashGap={6}
          dashThickness={2}
        />

        <FontAwesome name="circle-o" size={20} color="#69c1f7" />
      </HStack>
      <Dates route={route} />
      <Addresses route={route} />
    </Box>
  );
};

const Dates = ({route}) => {
  return (
    <HStack mt={2} justifyContent="space-between">
      <VStack space={1}>
        <Heading size="xs" fontWeight="400" color="trueGray.400">
          Dernier Dépot
        </Heading>
        <HStack alignItems="center" space={2}>
          {/* <FontAwesome5Icon name="calendar-check" size={15} color="gray" /> */}
          <Heading size="sm" color="blueGray.500">
            {moment(route.params.departureDate.toDate()).format('ll')}
          </Heading>
        </HStack>
        {/* <Divider mt={2} size={2} /> */}
      </VStack>
      <VStack space={1}>
        <Heading
          size="xs"
          fontWeight="400"
          color="trueGray.400"
          textAlign="right">
          Distribution
        </Heading>
        <HStack alignItems="center" space={2}>
          {/* <FontAwesome5Icon name="calendar-times" size={20} color="gray" /> */}
          <Heading size="sm" color="blueGray.500">
            {moment(route.params.distributionDate.toDate()).format('ll')}
          </Heading>
        </HStack>
        {/* <Divider mt={2} size={2} /> */}
      </VStack>
    </HStack>
  );
};
const Addresses = ({route}) => {
  return (
    <HStack mt={4} justifyContent="space-between" space={2}>
      <VStack space={1} flex={1}>
        <Heading size="xs" fontWeight="400" color="trueGray.400">
          Adresse de dépot
        </Heading>
        <HStack alignItems="center" space={2}>
          {/* <FontAwesome5Icon name="calendar-check" size={20} color="gray" /> */}
          <Heading size="sm" color="blueGray.500">
            Cité Sonatel 1, Dakar
          </Heading>
        </HStack>
        {/* <Divider mt={2} size={2} /> */}
      </VStack>
      <VStack space={1} flex={1}>
        <Heading
          size="xs"
          fontWeight="400"
          color="trueGray.400"
          textAlign="right">
          Adresse de distribution
        </Heading>
        <HStack alignItems="center" space={2} justifyContent="flex-end">
          {/* <FontAwesome5Icon name="calendar-times" size={20} color="gray" /> */}
          <Heading size="sm" color="blueGray.500">
            13 rue LaRue, Paris
          </Heading>
        </HStack>
        {/* <Divider mt={2} size={2} /> */}
      </VStack>
    </HStack>
  );
};

const PaymentType = () => {
  const {paymentMethod, setpaymentMethod, shipping, setshipping} =
    useContext(ReservationContext);
  return (
    <VStack mt={2} space={1} p={5} rounded={10} bg="white">
      <Text color="trueGray.500">Méthode de paiement</Text>

      <Radio.Group
        value={paymentMethod}
        onChange={value => setpaymentMethod(value)}>
        <Radio value="money">Espéces</Radio>
        <Radio value="cart" mt={1} isDisabled={true}>
          <Text ml={3} color="gray.400">
            Carte bancaire (En cours)
          </Text>
        </Radio>
        <Radio value="transfert" mt={1} isDisabled={true}>
          <Text ml={3} color="gray.400">
            Wave, Orange Money (En cours)
          </Text>
        </Radio>
      </Radio.Group>
      <Text color="trueGray.500">Livraison</Text>

      <HStack mt={2}>
        <Checkbox isChecked={shipping} onChange={value => setshipping(value)}>
          Livraison partout à Dakar pour 2 euros
        </Checkbox>
      </HStack>
    </VStack>
  );
};

export const ReservationContext = createContext();

const FlightDescription = ({navigation, route}) => {
  const [bagageType, setbagageType] = useState('thing');
  const [weight, setweight] = useState('1');
  const [phoneInfomartions, setphoneInfomartions] = useState({
    brand: 'Apple',
    model: 'Iphone 12',
  });
  const [suitCaseType, setsuitCaseType] = useState('soute');
  const [liquidType, setliquidType] = useState('parfum');
  const [moneyCurrency, setmoneyCurrency] = useState('euro');
  const [money, setmoney] = useState();

  //livraison
  const [shipping, setshipping] = useState(true);

  //paiement
  const [paymentMethod, setpaymentMethod] = useState('money');

  const [validationModalOpened, setvalidationModalOpened] = useState(false);

  const {user} = useContext(AuthenticationContext);

  const makeReservation = type => {
    setvalidationModalOpened(true);
    // navigation.navigate('CheckOut');
    // makeReservationWeight(
    //   route.params.id,
    //   route.params.pricePerKg,
    //   weight,
    //   shipping,
    //   user.uid,
    //   paymentMethod,
    //   shipping,
    // );
  };

  const ValidationButton = () => {
    return (
      <Center>
        <Button
          width="100%"
          bg="primary.500"
          size="lg"
          endIcon={
            <MaterialIcon name="arrow-forward" size={18} color="white" />
          }
          onPress={() => setvalidationModalOpened(true)}>
          <HStack space={2}>
            <Text color="white">Reserver</Text>
            <Text rounded={20} color="white" underline>
              {calculatePricePerKG(
                'weight',
                weight,
                shipping,
                route.params.pricePerKg,
              ) + ' €'}
            </Text>
          </HStack>
        </Button>
      </Center>
    );
  };

  const CheckOutButton = () => {
    return (
      <Center>
        <Button>Valider</Button>
      </Center>
    );
  };

  const CheckOutModal = () => {
    const Summary = () => {
      return (
        <Box p={5} bg="white" rounded={10} shadow={0}>
          <Text color="trueGray.500">Produit</Text>

          <HStack mt={2} space={2} justifyContent="space-between">
            <HStack alignItems="flex-end" space={3}>
              <MaterialCommunityIcons
                name="weight-kilogram"
                size={25}
                color="gray"
              />
              <Text>{weight} kg </Text>
            </HStack>
            <Heading size="sm" fontWeight="500" color="gray.500">
              {calculatePricePerKG(
                'weight',
                weight,
                false,
                route.params.pricePerKg,
              )}{' '}
              $
            </Heading>
          </HStack>
          <HStack mt={2} space={2} justifyContent="space-between">
            <HStack alignItems="flex-end" space={3}>
              <FontAwesome5Icon name="shipping-fast" size={17} color="gray" />

              <Text>Livraison </Text>
            </HStack>
            <Heading size="sm" fontWeight="500" color="gray.500">
              2 $
            </Heading>
          </HStack>
          <Divider my={1} />
          <HStack mt={2} space={2} justifyContent="space-between">
            <Text>Total </Text>

            <Heading
              size="md"
              textAlign="right"
              fontWeight="500"
              color="green.600">
              {calculatePricePerKG(
                'weight',
                weight,
                shipping,
                route.params.pricePerKg,
              )}{' '}
              $
            </Heading>
          </HStack>
        </Box>
      );
    };

    return (
      <Box>
        <Modal
          size="full"
          isOpen={validationModalOpened}
          onClose={() => setvalidationModalOpened(false)}>
          <Modal.Content style={{marginBottom: 0}}>
            <Modal.CloseButton />
            <Modal.Header>Validation </Modal.Header>
            <Modal.Body>
              <Summary />
              <PaymentType />
              <CheckOutButton />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      {/* <ScrollView> */}
      <Box bg="blueGray.200" flex={1}>
        <Box flex={1} p={4}>
          <ReservationContext.Provider
            value={{
              phoneInfomartions,
              setphoneInfomartions,
              bagageType,
              setbagageType,
              weight,
              setweight,
              suitCaseType,
              setsuitCaseType,
              liquidType,
              setliquidType,
              moneyCurrency,
              setmoneyCurrency,
              money,
              setmoney,
              route,
              shipping,
              setshipping,
              paymentMethod,
              setpaymentMethod,
            }}>
            <Countries route={route} />
            <BagagesAndQuantity />
            {/* <PaymentType /> */}
            <VStack flexGrow={1} space={1} mt={2}></VStack>
            <ValidationButton />
            <CheckOutModal />
          </ReservationContext.Provider>
        </Box>
      </Box>
      {/* </ScrollView > */}
    </NativeBaseProvider>
  );
};

export default FlightDescription;
