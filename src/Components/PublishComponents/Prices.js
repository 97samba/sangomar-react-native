import {
  HStack,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  Select,
  Modal,
  Pressable,
  Box,
} from 'native-base';
import React, {useContext, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import IonIcon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {PublishContext} from '../../screens/Publish';

const PriceAdder = ({isOpen, setIsOpen, addContact}) => {
  const [state, setstate] = useState({
    type: 'electronic',
    price: '',
  });

  const types = [
    {
      value: 'thing',
      label: 'Par kilo',
      startIcon: (
        <MaterialCommunityIcons name="weight-kilogram" size={25} color="gray" />
      ),
    },
    {
      value: 'electronic',
      label: 'Electronique',
      startIcon: <MaterialIcon name="phone-iphone" size={20} color="gray" />,
    },
    {
      value: 'paper',
      label: 'Documents',
      startIcon: <MaterialIcon name="mail" size={20} color="gray" />,
    },
    {
      value: 'suitcase',
      label: 'Valise',
      startIcon: (
        <FontAwesome5Icon name="suitcase-rolling" size={20} color="gray" />
      ),
    },
    {
      value: 'liquid',
      label: 'Liquide',
      startIcon: <MaterialCommunityIcons name="water" size={20} color="gray" />,
    },
    {
      value: 'money',
      label: 'Argent',
      startIcon: <Fontisto name="money-symbol" size={20} color="gray" />,
    },
    {
      value: 'food',
      label: 'Alimentaire',
      startIcon: <IonIcon name="fast-food" size={20} color="gray" />,
    },
  ];

  const handleValidate = () => {};

  return (
    <VStack>
      <Button
        onPress={() => setIsOpen(true)}
        bg="blueGray.400"
        _text={{
          color: 'white',
        }}
        my={2}
        size="sm">
        Ajouter un contact
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Ajouter un tarif</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center">
                <Heading
                  fontWeight="500"
                  color="trueGray.600"
                  size="sm"
                  flex={1}>
                  Type colis :{' '}
                </Heading>
                <Select
                  flex={1}
                  placeholder="type"
                  selectedValue={state.type}
                  onValueChange={text => setstate({...state, type: text})}>
                  {types.map((type, index) => (
                    <Select.Item
                      key={index}
                      label={type.label}
                      value={type.value}
                      startIcon={type.startIcon}
                    />
                  ))}
                </Select>
              </HStack>
            </VStack>

            <VStack space={2} mt={2}>
              <Input
                keyboardType="numeric"
                value={state.userPhoneNumber}
                rounded={4}
                variant="unstyled"
                bg="white"
                placeholder="Prix"
                onChangeText={text =>
                  setstate({...state, userPhoneNumber: text})
                }
                InputLeftElement={
                  <FontAwesome
                    name="money"
                    size={20}
                    color="gray"
                    style={{marginLeft: 10}}
                  />
                }
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" bg="blueGray.400" onPress={handleValidate}>
              Valider
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
};

const Prices = () => {
  const {
    pricePerKg,
    setpricePerKg,
    setpricePerSuitcase,
    pricePerSuitcase,
    currency,
    setcurrency,
    prices,
    setPrices,
  } = useContext(PublishContext);
  const [isOpen, setisOpen] = useState(false);
  const addPrice = () => {};
  const currencies = ['€', '$', 'CFA', '£'];
  return (
    <VStack space={2}>
      <HStack alignItems="center" justifyContent="space-between">
        <Heading fontSize={20} my={2} color="blueGray.600">
          Tarifications
        </Heading>
      </HStack>
      <HStack rounded={5} bg="white" alignItems="center" pr={3}>
        <Input
          flex={6}
          keyboardType="numeric"
          value={pricePerKg}
          onChangeText={value => setpricePerKg(value)}
          variant="unstyled"
          placeholder="Prix par kilo"
          InputLeftElement={
            <IonIcon
              name="pricetag"
              size={20}
              color="gray"
              style={{marginLeft: 10}}
            />
          }
        />
        <Select
          flex={2}
          width={90}
          variant="unstyled"
          selectedValue={currency}
          onValueChange={value => setcurrency(value)}>
          {currencies.map((currency, index) => (
            <Select.Item value={currency} key={index} label={currency} />
          ))}
        </Select>
      </HStack>
      <HStack rounded={5} bg="white" alignItems="center" pr={3} flex={1}>
        <Input
          flex={6}
          keyboardType="numeric"
          value={pricePerSuitcase}
          onChangeText={value => setpricePerSuitcase(value)}
          rounded={4}
          variant="unstyled"
          bg="white"
          placeholder="Prix par valise"
          InputLeftElement={
            <IonIcon
              name="pricetags-outline"
              size={20}
              color="gray"
              style={{marginLeft: 10}}
            />
          }
        />
        <Select
          flex={2}
          variant="unstyled"
          selectedValue={currency}
          onValueChange={value => setcurrency(value)}>
          {currencies.map((currency, index) => (
            <Select.Item value={currency} key={index} label={currency} />
          ))}
        </Select>
      </HStack>

      <PriceAdder isOpen={isOpen} setIsOpen={setisOpen} addPrice={addPrice} />
    </VStack>
  );
};

export default Prices;
