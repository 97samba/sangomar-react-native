import {VStack, Text, Heading, Input} from 'native-base';
import React, {useContext, useEffect} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {PublishContext} from '../../screens/Publish';

const Vols = () => {
  const {departure, setdeparture, destination, setdestination} =
    useContext(PublishContext);

  return (
    <VStack space={2}>
      <Heading fontSize={20} pb={2} color="blueGray.600">
        Pays et ville
      </Heading>
      <Input
        value={departure}
        onChangeText={text => setdeparture(text)}
        rounded={4}
        variant="unstyled"
        bg="white"
        placeholder="Départ"
        InputLeftElement={
          <MaterialIcon
            name="flight-takeoff"
            size={20}
            color="gray"
            style={{marginLeft: 10}}
          />
        }
      />
      <Input
        value={destination}
        onChangeText={text => setdestination(text)}
        rounded={4}
        variant="unstyled"
        bg="white"
        placeholder="Destination"
        InputLeftElement={
          <MaterialIcon
            name="flight-land"
            size={20}
            color="gray"
            style={{marginLeft: 10}}
          />
        }
      />
    </VStack>
  );
};

export default Vols;
