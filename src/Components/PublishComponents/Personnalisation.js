import {VStack, Heading, Button} from 'native-base';
import React, {useState, createContext, useContext} from 'react';

import {PublishContext} from '../../screens/Publish';

const Personnalisation = () => {
  return (
    <VStack space={2}>
      <Heading fontSize={20} my={2} color="blueGray.600">
        Personalisations
      </Heading>

      <Button
        bg="blueGray.400"
        _text={{
          color: 'white',
        }}
        my={2}
        size="sm">
        Plus de Personnalisations
      </Button>
    </VStack>
  );
};

export default Personnalisation;
