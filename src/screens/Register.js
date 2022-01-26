import React, {useContext, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  NativeBaseProvider,
  VStack,
  Text,
  Link,
  HStack,
  Divider,
  FormControl,
  View,
} from 'native-base';
import {AuthenticationContext} from '../Navigation/AuthenticationProvider';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Pressable} from 'react-native';
import SocialAuth from '../Components/Others/SocialAuth';

const Register = ({navigation}) => {
  const {register} = useContext(AuthenticationContext);
  const [email, setemail] = useState('test@gmail.com');
  const [password1, setpassword1] = useState('testtest');
  const [password2, setpassword2] = useState('testtest');
  const [errorText, seterrorText] = useState();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  const ValidateRegister = async () => {
    seterrorText('');
    if (!(password1 !== '' && password1 === password2 && email)) {
      password1 !== password2 && seterrorText('Mots de passe différents');
      !email && seterrorText('Email requis');
      return;
    }
    const result = await register(email, password1, firstName, lastName);
    seterrorText(result);
  };

  return (
    <NativeBaseProvider>
      <Center pt={15}>
        <Heading>Register</Heading>
        <Text pt={2} color="secondary.600">
          {errorText}
        </Text>
      </Center>
      <VStack>
        <Box px={5}>
          {/* <HStack space={3}> */}

          <FormControl pt={2} isRequired>
            <HStack alignItems="center" p={2}>
              <MaterialIcon name="person" size={20} color="gray" />
              <Divider orientation="vertical" color="black" m={3} />
              <HStack flex={1}>
                <VStack space={1} flex={1}>
                  {firstName != '' ? (
                    <Heading
                      position="absolute"
                      ml={4}
                      fontWeight="400"
                      fontSize="xs">
                      Prénom
                    </Heading>
                  ) : null}

                  <Input
                    placeholder="Prénom"
                    variant="unstyled"
                    value={firstName}
                    fontSize={20}
                    isRequired
                    onChangeText={value => setfirstName(value)}
                  />
                </VStack>
                <Divider orientation="vertical" color="black" m={3} />

                <VStack space={1} flex={1}>
                  {lastName != '' ? (
                    <Heading
                      position="absolute"
                      ml={4}
                      fontWeight="400"
                      fontSize="xs">
                      Nom
                    </Heading>
                  ) : null}

                  <Input
                    placeholder="Nom"
                    variant="unstyled"
                    value={lastName}
                    fontSize={20}
                    isRequired
                    onChangeText={value => setlastName(value)}
                  />
                </VStack>
              </HStack>
            </HStack>
            <Divider />
          </FormControl>
          <FormControl pt={2} isRequired>
            <HStack alignItems="center" p={2}>
              <MaterialIcon name="alternate-email" size={20} color="gray" />
              <Divider orientation="vertical" color="black" m={3} />
              <VStack space={1} flexGrow={1}>
                {email != '' ? (
                  <Heading
                    position="absolute"
                    ml={4}
                    fontWeight="400"
                    fontSize="xs">
                    E-mail
                  </Heading>
                ) : null}

                <Input
                  placeholder="Email"
                  variant="unstyled"
                  value={email}
                  fontSize={22}
                  isRequired
                  onChangeText={value => setemail(value)}
                />
              </VStack>
            </HStack>
            <Divider />
          </FormControl>
          <FormControl isRequired>
            <HStack alignItems="center" p={2}>
              <MaterialIcon name="lock" size={20} color="gray" />
              <Divider orientation="vertical" color="black" m={3} />

              <VStack space={1} flexGrow={1}>
                {password1 != '' ? (
                  <Heading
                    position="absolute"
                    ml={4}
                    fontWeight="400"
                    fontSize="xs">
                    Mot de passe
                  </Heading>
                ) : null}

                <Input
                  value={password1}
                  placeholder="Mot de Passe"
                  secureTextEntry
                  fontSize={22}
                  variant="unstyled"
                  onChangeText={value => setpassword1(value)}
                />
              </VStack>
            </HStack>
            <Divider />
          </FormControl>
          <FormControl isRequired>
            <HStack alignItems="center" p={2}>
              <MaterialIcon name="lock" size={20} color="gray" />
              <Divider orientation="vertical" color="black" m={3} />

              <VStack space={1} flexGrow={1}>
                {password2 ? (
                  <Heading
                    position="absolute"
                    ml={4}
                    fontWeight="400"
                    fontSize="xs">
                    Mot de passe
                  </Heading>
                ) : null}

                <Input
                  value={password2}
                  placeholder="Confirmer le mot de passe"
                  secureTextEntry
                  fontSize={22}
                  variant="unstyled"
                  onChangeText={value => setpassword2(value)}
                />
              </VStack>
            </HStack>
            <Divider />
          </FormControl>
        </Box>
        <Center py={2}>
          <Button
            size="md"
            rounded={40}
            width={300}
            bg="#295BE0"
            onPress={ValidateRegister}>
            Créer
          </Button>
        </Center>
        <Center py={3}>
          <HStack>
            <Text fontSize="sm">Vous avez déja un compte,</Text>
            <Link
              onPress={() => navigation.navigate('Login')}
              _text={{fontSize: 'sm', color: '#295BE0'}}>
              {' '}
              connectez-vous
            </Link>
          </HStack>
        </Center>
      </VStack>
      <VStack pt={5}>
        <SocialAuth />
      </VStack>
    </NativeBaseProvider>
  );
};

export default Register;
