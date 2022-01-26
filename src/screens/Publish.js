import {Box, NativeBaseProvider, VStack, Button, ScrollView} from 'native-base';
import React, {useState, createContext, useContext, useEffect} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Vols from '../Components/PublishComponents/Vols';
import Valises from '../Components/PublishComponents/Valises';
import Prices from '../Components/PublishComponents/Prices';
import DepotRetrait from '../Components/PublishComponents/DepotRetrait';
import Contacts from '../Components/PublishComponents/Contacts';
import Personnalisation from '../Components/PublishComponents/Personnalisation';
import Dates from '../Components/PublishComponents/Dates';
import {ValidateFlight} from '../utils/Middlewares/PublishMiddleware';
import Firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from '../Navigation/AuthenticationProvider';

export const PublishContext = createContext();

const MoreButton = () => {
  const {handleSave} = useContext(PublishContext);
  return (
    <VStack>
      <Button
        // variant="unstyled"
        bg="teal.400"
        rounded={0}
        onPress={handleSave}
        startIcon={
          <MaterialIcon
            name="add"
            size={20}
            color="white"
            style={{marginRight: 10}}
          />
        }>
        Publier
      </Button>
    </VStack>
  );
};

const Publish = () => {
  const {user} = useContext(AuthenticationContext);
  //vols
  const [departure, setdeparture] = useState('dakar');
  const [destination, setdestination] = useState('Paris');

  //dates
  const [departureDate, setdepartureDate] = useState(new Date());
  const [lastDepot, setLastDepot] = useState(
    new Date().setDate(departureDate.getDate() - 1),
  );
  const [distributionDate, setdistributionDate] = useState(
    new Date().setDate(departureDate.getDate() + 1),
  );

  //Valises
  const [bagages, setBagages] = useState([
    {
      type: 'soute',
      poids: 23,
      unite: 'kg',
      key: 0,
    },
    {
      type: 'cabine',
      poids: 12,
      unite: 'kg',
      key: 1,
    },
  ]);

  //Adresses
  const [depotAdresse, setdepotAdresse] = useState('Cité Sonatel 1,Dakar');
  const [retraitAdresse, setretraitAdresse] = useState(
    'Barbes Rochechoir, Paris 18',
  );

  //contact
  const [userFirstName, setuserFirstName] = useState(
    user.displayName.split(' ')[0],
  );
  const [userName, setuserName] = useState(user.displayName.split(' ')[1]);
  const [userPhoneNumber, setuserPhoneNumber] = useState('0612345687');
  const [userPoneNumberPrivacy, setuserPoneNumberPrivacy] = useState('public');
  const [contacts, setcontacts] = useState({
    principal: {
      userFirstName: userFirstName,
      userName: userName,
      userPhoneNumber: userPhoneNumber,
      userPoneNumberPrivacy: userPoneNumberPrivacy,
    },
    others: [],
  });

  //tarifications
  const [pricePerKg, setpricePerKg] = useState('10');
  const [pricePerSuitcase, setpricePerSuitcase] = useState('200');
  const [currency, setcurrency] = useState('€');

  const [prices, setPrices] = useState({
    pricePerKg: pricePerKg,
    pricePerSuitcase: pricePerSuitcase,
    others: [
      {
        price: '11',
        icon: <MaterialIcon name="phone" size={20} color="gray" />,
        type: 'electronic',
      },
    ],
    currency: currency,
  });

  const handleSave = () => {
    //verify vol
    const validation = ValidateFlight(departure, destination);
    console.log(`validation vol `, validation);
    //verify dates
    //verify valises
    //verify depot
    //verify contact
    //verify price
    publishItem();
  };

  const publishItem = async () => {
    const item = {
      publisher: {
        firstName: userFirstName,
        lastName: userName,
        id: user.uid,
        phone: userPhoneNumber,
      },
      contacts: {
        gp: {
          ...contacts.principal,
        },
        others: contacts.others,
      },
      departure: departure,
      destination: destination,
      departureDate: departureDate,
      distributionDate: distributionDate,
      lastDepot: lastDepot,
      valise: bagages,
      depotAdresse: depotAdresse,
      retraitAdresse: retraitAdresse,
      pricePerKg: pricePerKg,
      pricePerSuitcase: pricePerSuitcase,
    };
    console.log(`item`, item);
    // await Firestore()
    //   .collection('flights')
    //   .add(item)
    //   .then(() => console.log('done'));
  };
  useEffect(() => {
    console.log(`user`, user);
  });

  return (
    <NativeBaseProvider>
      <ScrollView>
        <PublishContext.Provider
          value={{
            prices,
            setPrices,
            contacts,
            setcontacts,
            departure,
            setdeparture,
            destination,
            setdestination,
            departureDate,
            setdepartureDate,
            lastDepot,
            setLastDepot,
            distributionDate,
            setdistributionDate,
            bagages,
            setBagages,
            depotAdresse,
            setdepotAdresse,
            retraitAdresse,
            setretraitAdresse,
            userName,
            setuserName,
            userFirstName,
            setuserFirstName,
            userPhoneNumber,
            setuserPhoneNumber,
            userPoneNumberPrivacy,
            setuserPoneNumberPrivacy,
            pricePerKg,
            setpricePerKg,
            pricePerSuitcase,
            setpricePerSuitcase,
            handleSave,
            currency,
            setcurrency,
          }}>
          <Box flex={1} p={5} color="gray">
            <Vols />
            <Dates />
            <Valises />
            <DepotRetrait />
            <Contacts />
            <Prices />
            <Personnalisation />
          </Box>
          <MoreButton />
        </PublishContext.Provider>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Publish;
