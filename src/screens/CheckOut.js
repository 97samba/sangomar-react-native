import {
  Heading,
  Box,
  NativeBaseProvider,
  VStack,
  HStack,
  Button,
} from 'native-base';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CheckOut = () => {
  const cardPayment = [
    {
      name: 'Card',
    },
    {
      name: 'applePay',
    },
    {
      name: 'paypal',
    },
  ];
  return (
    <NativeBaseProvider>
      <Box>
        <VStack p={5}>
          <Box bg="white" p={5} rounded={10}>
            <HStack justifyContent="space-between">
              <Heading fontWeight="400" size="sm">
                Carte de crédit
              </Heading>
              <FontAwesome name="credit-card" size={20} color="gray" />
            </HStack>
            <HStack justifyContent="space-between" px={3} mt={3}>
              {cardPayment.map(mode => (
                // <Box border={1} rounded={10} p={2} borderColor="red">
                //   {mode.name}
                // </Box>
                <Button
                  variant="outline"
                  color="trueGray.400"
                  borderColor="blueGray.400">
                  {mode.name}
                </Button>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default CheckOut;
