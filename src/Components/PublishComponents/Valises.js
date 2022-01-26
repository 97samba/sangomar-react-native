import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  Button,
  Select,
  Modal,
  Pressable,
} from 'native-base';
import React, {useContext, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {PublishContext} from '../../screens/Publish';

const Soute = ({item}) => {
  const {bagages, setBagages} = useContext(PublishContext);
  const deleteSuitcase = () => {
    setBagages(bagages.filter(bagage => bagage.key != item.key));
  };
  const handleWeightChange = value => {
    const newState = bagages.map(bagage => {
      if (bagage.key === item.key) {
        return {...bagage, poids: value};
      } else {
        return bagage;
      }
    });
    setBagages(newState);
  };
  return (
    <HStack space={3} bg="white" py={1} rounded={5} alignItems="center">
      <FontAwesome5
        name="suitcase"
        size={20}
        color="gray"
        style={{marginLeft: 10}}
      />
      <Text flexGrow={1}>Soute</Text>
      <Pressable onPress={deleteSuitcase}>
        <MaterialIcon name="delete" size={20} color="tomato" />
      </Pressable>
      <Box>
        <Select
          minWidth={110}
          height={45}
          placeholder="Poids"
          selectedValue={item.poids}
          onValueChange={handleWeightChange}
          borderColor="white">
          <Select.Item label={'23 kg'} value={23} />
          <Select.Item label={'32 kg'} value={32} />
        </Select>
      </Box>
    </HStack>
  );
};

const Cabine = ({item}) => {
  const {bagages, setBagages} = useContext(PublishContext);

  const deleteSuitcase = () => {
    setBagages(bagages.filter(bagage => bagage.key != item.key));
  };
  const handleWeightChange = value => {
    const newState = bagages.map(bagage => {
      if (bagage.key === item.key) {
        return {...bagage, poids: value};
      } else {
        return bagage;
      }
    });
    setBagages(newState);
  };
  return (
    <HStack space={3} bg="white" rounded={5} alignItems="center">
      <FontAwesome5
        name="suitcase-rolling"
        size={20}
        color="gray"
        style={{marginLeft: 10}}
      />
      <Text flexGrow={1}>Cabine</Text>
      <Pressable onPress={deleteSuitcase}>
        <MaterialIcon name="delete" size={20} color="tomato" />
      </Pressable>
      <Box>
        <Select
          minWidth={110}
          placeholder="Poids"
          borderColor="white"
          onValueChange={handleWeightChange}
          selectedValue={item.poids}>
          <Select.Item label={'8 kg'} value={8} />
          <Select.Item label={'10 kg'} value={10} />
          <Select.Item label={'12 kg'} value={12} />
        </Select>
      </Box>
    </HStack>
  );
};

const SuitCaseAdder = ({isOpen, setIsOpen, addValise}) => {
  const [itemAdded, setitemAdded] = useState('soute');
  const [weight, setweight] = useState(23);
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
        Ajouter une valise
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Ajouter une valise</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack space={2} alignItems="center">
                <Heading size="sm" flexGrow={1}>
                  Type :{' '}
                </Heading>
                <Pressable onPress={() => setitemAdded('soute')}>
                  <HStack
                    space={2}
                    bg={itemAdded === 'soute' ? 'blueGray.300' : null}
                    p={2}
                    rounded={5}
                    mx={2}>
                    <FontAwesome5 name="suitcase" size={20} color="gray" />
                    <Text>Soute</Text>
                  </HStack>
                </Pressable>

                <Pressable onPress={() => setitemAdded('cabine')}>
                  <HStack
                    borderRadius={5}
                    space={2}
                    p={2}
                    mx={2}
                    bg={itemAdded === 'cabine' ? 'blueGray.300' : null}>
                    <FontAwesome5
                      name="suitcase-rolling"
                      size={20}
                      color="gray"
                    />
                    <Text>Cabine</Text>
                  </HStack>
                </Pressable>
              </HStack>
              <HStack space={2} alignItems="center">
                <Heading size="sm" flex={1}>
                  Quantité :{' '}
                </Heading>
                {itemAdded === 'soute' ? (
                  <Select
                    placeholder="Poids"
                    flex={2}
                    selectedValue={weight}
                    onValueChange={value => setweight(value)}>
                    <Select.Item value={32} label="32 kg" />
                    <Select.Item value={23} label="23 kg" />
                    <Select.Item value={0} label="autre" />
                  </Select>
                ) : (
                  <Select
                    placeholder="Poids"
                    flex={2}
                    selectedValue={weight}
                    onValueChange={value => setweight(value)}>
                    <Select.Item value={12} label="12 kg" />
                    <Select.Item value={10} label="10 kg" />
                    <Select.Item value={8} label="8 kg" />
                    <Select.Item value={0} label="autre" />
                  </Select>
                )}
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              bg="blueGray.400"
              _text={{color: 'white'}}
              onPress={() => {
                addValise(itemAdded, weight, 'kg');
                setIsOpen(false);
              }}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
};

const Valises = () => {
  const {bagages, setBagages} = useContext(PublishContext);
  const [isOpen, setIsOpen] = useState(false);

  const addValise = (type, weight, unit) => {
    setBagages([
      ...bagages,
      {
        type: type,
        poids: weight,
        unite: unit,
        key: bagages.length,
      },
    ]);
    console.log(`bagages`, bagages);
  };
  return (
    <VStack space={2}>
      <Heading fontSize={20} my={2} color="blueGray.600">
        Valises
      </Heading>
      {bagages
        .sort((a, b) => a.type > b.type)
        .map(bagage =>
          bagage.type === 'soute' ? (
            <Soute item={bagage} key={bagage.key} />
          ) : (
            <Cabine item={bagage} key={bagage.key} />
          ),
        )}

      <SuitCaseAdder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addValise={addValise}
      />
    </VStack>
  );
};
export default Valises;
