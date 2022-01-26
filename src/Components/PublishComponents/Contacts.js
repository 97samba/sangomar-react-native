import {
  VStack,
  HStack,
  Heading,
  Input,
  Button,
  Select,
  Modal,
  Pressable,
  Text,
  Box,
  Divider,
} from 'native-base';
import React, {useContext, useState} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {PublishContext} from '../../screens/Publish';

const ContactAdder = ({isOpen, setIsOpen, addContact}) => {
  const [state, setstate] = useState({
    userFirstName: '',
    userLastName: '',
    role: 'distribution',
    userPhoneNumber: '',
  });

  const handleValidate = () => {
    console.log(`state`, state);
    if (state.userFirstName != '' && state.userPhoneNumber != '') {
      addContact(state);
      setIsOpen(false);
    } else {
      console.log('remplisser les informations');
    }
  };

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
          <Modal.Header>Ajouter un contact</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center">
                <Heading size="sm" flexGrow={1}>
                  Rôle :{' '}
                </Heading>
                <Pressable
                  onPress={() => setstate({...state, role: 'distribution'})}>
                  <HStack
                    space={2}
                    bg={state.role === 'distribution' ? 'blueGray.300' : null}
                    p={2}
                    rounded={5}
                    mx={2}>
                    <MaterialCommunityIcons
                      name="package-up"
                      size={20}
                      color="gray"
                    />
                    <Text>Distributeur</Text>
                  </HStack>
                </Pressable>

                <Pressable
                  onPress={() => setstate({...state, role: 'reciever'})}>
                  <HStack
                    borderRadius={5}
                    space={2}
                    p={2}
                    mx={2}
                    bg={state.role === 'reciever' ? 'blueGray.300' : null}>
                    <MaterialCommunityIcons
                      name="package-down"
                      size={20}
                      color="gray"
                    />
                    <Text>Receveur</Text>
                  </HStack>
                </Pressable>
              </HStack>
            </VStack>

            <VStack space={2} mt={2}>
              <Input
                value={state.userFirstName}
                // onChangeText={text => setuserFirstName(text)}
                rounded={4}
                variant="unstyled"
                bg="white"
                placeholder="Prénom"
                onChangeText={text => setstate({...state, userFirstName: text})}
                InputLeftElement={
                  <MaterialIcon
                    name="person"
                    size={20}
                    color="gray"
                    style={{marginLeft: 10}}
                  />
                }
              />
              <Input
                value={state.userLastName}
                rounded={4}
                variant="unstyled"
                bg="white"
                onChangeText={text => setstate({...state, userLastName: text})}
                placeholder="NOM"
                InputLeftElement={
                  <MaterialIcon
                    name="person"
                    size={20}
                    color="gray"
                    style={{marginLeft: 10}}
                  />
                }
              />
              <Input
                value={state.userPhoneNumber}
                rounded={4}
                variant="unstyled"
                bg="white"
                placeholder="Mon numéro"
                onChangeText={text =>
                  setstate({...state, userPhoneNumber: text})
                }
                InputLeftElement={
                  <MaterialIcon
                    name="call"
                    size={20}
                    color="gray"
                    style={{marginLeft: 10}}
                  />
                }
                InputRightElement={
                  <Select
                    minWidth={160}
                    placeholder="Visibilité"
                    // selectedValue={userPoneNumberPrivacy}
                    // onValueChange={value => setuserPoneNumberPrivacy(value)}
                    borderColor="white">
                    <Select.Item label={'Privé'} value="private" />
                    <Select.Item label={'Public'} value="public" />
                    <Select.Item label={'Me demander'} value="ask" />
                    <Select.Item
                      _text={{color: 'red.500'}}
                      label={'Supprimer'}
                      value={0}
                    />
                  </Select>
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

const Contacts = () => {
  const {
    contacts,
    setcontacts,
    setuserName,
    setuserFirstName,
    setuserPhoneNumber,
    setuserPoneNumberPrivacy,
  } = useContext(PublishContext);

  const [isOpen, setisOpen] = useState(false);

  const addContact = state => {
    var newState = contacts;
    newState.others.push({...state, id: contacts.others.length});
    console.log(`newstate`, newState);
    setcontacts(newState);
  };

  const deleteContact = id => {
    var newState = contacts.others.filter(contact => contact.id != id);
    setcontacts({...contacts, others: newState});
  };

  return (
    <VStack space={2}>
      <Heading fontSize={20} my={2} color="blueGray.600">
        Contacts
      </Heading>
      <Input
        value={contacts.principal.userFirstName}
        onChangeText={text => setuserFirstName(text)}
        rounded={4}
        variant="unstyled"
        bg="white"
        placeholder="Prénom"
        InputLeftElement={
          <MaterialIcon
            name="person"
            size={20}
            color="gray"
            style={{marginLeft: 10}}
          />
        }
      />
      <Input
        value={contacts.principal.userName}
        rounded={4}
        variant="unstyled"
        bg="white"
        onChangeText={value => setuserName(value)}
        placeholder="NOM"
        InputLeftElement={
          <MaterialIcon
            name="person"
            size={20}
            color="gray"
            style={{marginLeft: 10}}
          />
        }
      />
      <Input
        value={contacts.principal.userPhoneNumber}
        rounded={4}
        keyboardType="numeric"
        variant="unstyled"
        bg="white"
        placeholder="Mon numéro"
        onChangeText={value => setuserPhoneNumber(value)}
        InputLeftElement={
          <MaterialIcon
            name="call"
            size={20}
            color="gray"
            style={{marginLeft: 10}}
          />
        }
        InputRightElement={
          <Select
            minWidth={160}
            placeholder="Visibilité"
            selectedValue={contacts.principal.userPoneNumberPrivacy}
            onValueChange={value => setuserPoneNumberPrivacy(value)}
            borderColor="white">
            <Select.Item label={'Privé'} value="private" />
            <Select.Item label={'Public'} value="public" />
            <Select.Item label={'Me demander'} value="ask" />
            <Select.Item
              _text={{color: 'red.500'}}
              label={'Supprimer'}
              value={0}
            />
          </Select>
        }
      />
      {contacts.others.length > 0 ? (
        <VStack>
          <Heading my={2} size="sm" color="blueGray.600">
            Autre(s) contact(s)
          </Heading>
          {contacts.others.map((contact, index) => (
            <HStack
              key={index}
              p={3}
              rounded={10}
              bg="white"
              alignItems="center">
              <MaterialIcon name="person-outline" size={20} color="gray" />
              <HStack ml={3} space={2} flex={1}>
                <Text numberOfLines={1}>
                  {contact.userFirstName}, {contact.userLastName}
                </Text>
              </HStack>
              <Divider orientation="vertical" />

              <Text ml={3} numberOfLines={1} flex={1}>
                {contact.userPhoneNumber}
              </Text>
              <Pressable onPress={() => deleteContact(contact.id)}>
                <MaterialIcon name="delete" size={25} color="tomato" />
              </Pressable>
            </HStack>
          ))}
        </VStack>
      ) : null}
      <ContactAdder
        isOpen={isOpen}
        setIsOpen={setisOpen}
        addContact={addContact}
      />
    </VStack>
  );
};

export default Contacts;
