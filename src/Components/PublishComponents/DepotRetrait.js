import {VStack, Text, Heading, Input, Button, HStack} from 'native-base';
import React, {useContext} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PublishContext} from '../../screens/Publish';

const DepotRetrait = () => {
  const {depotAdresse, setdepotAdresse, retraitAdresse, setretraitAdresse} =
    useContext(PublishContext);

  return (
    <VStack space={2}>
      <Heading fontSize={20} my={2} color="blueGray.600">
        Dépot - Retrait
      </Heading>
      <HStack rounded={10} bg="white" alignItems="center">
        <MaterialCommunityIcons
          name="package-variant-closed"
          size={20}
          color="gray"
          style={{marginLeft: 10}}
        />
        <VStack p={1}>
          <Text ml={4} fontSize={13} color="gray.500">
            Dépot
          </Text>
          <Input
            height={12}
            value={depotAdresse}
            onChangeText={value => setdepotAdresse(value)}
            variant="unstyled"
            placeholder="Adresse dépot"
          />
        </VStack>
      </HStack>
      <HStack rounded={10} bg="white" alignItems="center">
        <MaterialCommunityIcons
          name="package-variant"
          size={20}
          color="gray"
          style={{marginLeft: 10}}
        />
        <VStack p={1}>
          <Text ml={4} fontSize={13} color="gray.500">
            Retrait
          </Text>
          <Input
            height={12}
            value={retraitAdresse}
            onChangeText={value => setretraitAdresse(value)}
            rounded={4}
            variant="unstyled"
            bg="white"
            placeholder="Adresse retrait"
          />
        </VStack>
      </HStack>

      <Button
        bg="blueGray.400"
        _text={{
          color: 'white',
        }}
        my={2}
        size="sm">
        Ajouter une adresse
      </Button>
    </VStack>
  );
};

export default DepotRetrait;
