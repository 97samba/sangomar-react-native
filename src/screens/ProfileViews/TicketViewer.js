import {
  HStack,
  NativeBaseProvider,
  VStack,
  Text,
  Divider,
  Center,
  Button,
} from 'native-base';
import React, {useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from '../../Navigation/AuthenticationProvider';

const TicketViewer = ({navigation, route}) => {
  const {user} = useContext(AuthenticationContext);

  const handleSend = async () => {
    const collection = await firestore()
      .collection('flights')
      .doc(user.uid)
      .set({
        departure: 'Dakar',
        destination: 'Bandjul',
      })
      .then(() => console.log('added'));
    // console.log(`collection`, collection);
  };

  return (
    <NativeBaseProvider>
      <VStack p={5}>
        <VStack p={5} bg="white">
          <Text>{user.uid}</Text>
          <HStack justifyContent="space-between">
            <Text>Mon ticket {route.params.key}</Text>
            <Text>AA 1129 </Text>
          </HStack>
        </VStack>
        <Divider mx={2} />
        <HStack
          p={5}
          bg="white"
          justifyContent="space-between"
          style={{borderTopColor: 'black'}}>
          <VStack>
            <Text>Date</Text>
            <Text>Date</Text>
            <Text>Dakar</Text>
            <Text>Sénégal</Text>
          </VStack>
          <VStack></VStack>
          <VStack>
            <Text>Date</Text>
            <Text>Date</Text>
            <Text>Dakar</Text>
            <Text>Sénégal</Text>
          </VStack>
        </HStack>
        <Divider mx={5} />
        <HStack p={5} bg="primary.100" justifyContent="space-between">
          <VStack>
            <Text>Date</Text>
            <Text>Date</Text>
            <Text>Dakar</Text>
            <Text>Sénégal</Text>
          </VStack>
          <VStack></VStack>
          <VStack>
            <Text>Date</Text>
            <Text>Date</Text>
            <Text>Dakar</Text>
            <Text>Sénégal</Text>
          </VStack>
        </HStack>
        <Center>
          <Button onPress={handleSend}>enregistrer</Button>
        </Center>
      </VStack>
    </NativeBaseProvider>
  );
};

export default TicketViewer;
