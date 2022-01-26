import {Box, Heading, HStack, Input, Select, Text, VStack} from 'native-base';
import React, {useContext} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import IonIcon from 'react-native-vector-icons/Ionicons';
import {ReservationContext} from '../Main/FlightDescription';

const BagagesAndQuantity = () => {
  const {
    bagageType,
    setbagageType,
    setweight,
    weight,
    phoneInfomartions,
    setphoneInfomartions,
    suitCaseType,
    setsuitCaseType,
    route,
  } = useContext(ReservationContext);
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

  const PhoneModels = [
    {
      brand: 'Apple',
      models: [
        'Iphone 5',
        'Iphone 6, plus',
        'Iphone 7, plus',
        'Iphone 8, plus',
        'Iphone x',
        'Iphone xs, max',
        'Iphone 11, pro, max',
        'Iphone 12, pro, max',
        'autre',
      ],
    },
    {
      brand: 'Samsung',
      models: ['s5', 's6, plus', 's7, plus', 's8, plus', 'autre'],
    },
    {
      brand: 'Autre',
      models: ['autre'],
    },
  ];

  const bagagesSize = [
    {
      type: 'soute',
      label: 'Soute',
      unity: 'kg',
      poids: [8, 10, 12],
    },
    {
      type: 'cabine',
      label: 'Cabine',
      unity: 'kg',
      poids: [23, 32],
    },
  ];

  const liquids = [
    {
      type: 'parfum',
      label: 'Parfum',
      unity: 'ml',
      sizes: [15, 25, 30, 40, 50, 75, 100, 200, 400],
    },
    {
      type: 'alimentaire',
      label: 'Alimentaire',
      unity: 'ml',
      sizes: [15, 25, 30, 40, 50, 75, 100, 200, 400],
    },
    {
      type: 'autre',
      label: 'Autre',
      unity: 'ml',
      sizes: [15, 25, 30, 40, 50, 75, 100, 200, 400],
    },
  ];
  const renderTypes = () => {
    switch (bagageType) {
      case 'thing':
        return (
          <Box>
            <Heading size="sm" fontWeight="400" color="trueGray.400" mt="1">
              Poids
            </Heading>
            <Input
              variant="underlined"
              placeholder="en kg"
              value={weight}
              onChangeText={value => setweight(value)}
            />
          </Box>
        );
      case 'electronic':
        return (
          <Box>
            <Heading size="sm" fontWeight="400" color="trueGray.400" mt="1">
              Informations
            </Heading>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              mt={2}
              space={2}>
              <Select
                variant="unstyled"
                bg="blueGray.200"
                width="50%"
                placeholder="Marque"
                selectedValue={phoneInfomartions.brand}
                onValueChange={value =>
                  setphoneInfomartions({...phoneInfomartions, brand: value})
                }>
                {PhoneModels.map((brand, index) => (
                  <Select.Item
                    label={brand.brand}
                    key={index}
                    value={brand.brand}
                  />
                ))}
              </Select>
              <Select
                placeholder="Modéle"
                width="50%"
                variant="unstyled"
                bg="blueGray.200">
                {PhoneModels.filter(
                  model => model.brand === phoneInfomartions.brand,
                ).map(brand => {
                  return brand.models.map((model, index) => (
                    <Select.Item label={model} key={index} />
                  ));
                })}
              </Select>
            </HStack>
          </Box>
        );
      case 'liquid':
        return (
          <Box>
            <Heading size="sm" fontWeight="400" color="trueGray.400" mt="1">
              Informations
            </Heading>
            <HStack justifyContent="space-between" alignItems="center" mt={2}>
              <Select
                variant="unstyled"
                bg="blueGray.200"
                width="50%"
                placeholder="Type"
                selectedValue={phoneInfomartions.brand}
                onValueChange={value =>
                  setphoneInfomartions({...phoneInfomartions, brand: value})
                }>
                {liquids.map((liquid, index) => (
                  <Select.Item
                    label={liquid.label}
                    key={index}
                    value={liquid.type}
                  />
                ))}
              </Select>
              <Select
                placeholder="Quantité"
                width="50%"
                variant="unstyled"
                bg="blueGray.200">
                {liquids
                  .filter(model => model.brand === phoneInfomartions.brand)
                  .map(brand => {
                    return brand.models.map((model, index) => (
                      <Select.Item label={model} key={index} />
                    ));
                  })}
              </Select>
            </HStack>
          </Box>
        );
      case 'suitcase':
        return (
          <Box>
            <Heading size="sm" fontWeight="400" color="trueGray.400" mt="1">
              Informations
            </Heading>
            <HStack justifyContent="space-between" alignItems="center" mt={2}>
              <Select
                variant="unstyled"
                bg="blueGray.200"
                width="50%"
                placeholder="Type"
                selectedValue={phoneInfomartions.brand}
                onValueChange={value =>
                  setphoneInfomartions({...phoneInfomartions, brand: value})
                }>
                {bagagesSize.map((bagage, index) => (
                  <Select.Item
                    label={bagage.label}
                    value={bagage.type}
                    key={index}
                  />
                ))}
              </Select>
              <Select
                variant="unstyled"
                bg="blueGray.200"
                onValueChange={value => setsuitCaseType(value)}
                placeholder="Poids"
                width="50%"
                selectedValue={suitCaseType}>
                {bagagesSize
                  .filter(bagage => bagage.type === suitCaseType)
                  .map(brand => {
                    return brand.poids.map((poids, index) => (
                      <Select.Item
                        label={poids + ' ' + brand.unity}
                        value={poids}
                        key={index}
                      />
                    ));
                  })}
              </Select>
            </HStack>
          </Box>
        );
        c;
      default:
        return <Text>default</Text>;
    }
  };

  const getPrice = type => {};

  return (
    <VStack space={1} mt={2} p={5} bg="white" rounded={10}>
      <Heading size="xs" fontWeight="400" color="trueGray.400">
        Bagages et Quantité
      </Heading>

      <HStack alignItems="center" justifyContent="space-between">
        <Select
          flex={1}
          variant="unstyled"
          bg="blueGray.200"
          selectedValue={bagageType}
          placeholder="Type"
          defaultValue="thing"
          onValueChange={value => setbagageType(value)}>
          {types.map((type, index) => (
            <Select.Item
              value={type.value}
              label={type.label}
              startIcon={type.startIcon}
              key={index}
            />
          ))}
        </Select>
        <HStack
          justifyContent="flex-end"
          space={2}
          alignItems="flex-end"
          flex={1}>
          <Heading color="blueGray.500" size="md">
            {route.params.pricePerKg} €
          </Heading>
          <Heading size="sm" color="gray.400">
            / kg
          </Heading>
        </HStack>
      </HStack>
      <Box>{renderTypes()}</Box>
    </VStack>
  );
};

export default BagagesAndQuantity;
