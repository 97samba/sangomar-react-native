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
  FormControl,
  Divider,
  Icon,
} from 'native-base';
import {AuthenticationContext} from '../Navigation/AuthenticationProvider';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SocialAuth from '../Components/Others/SocialAuth';

const Login = ({navigation}) => {
  const {login} = useContext(AuthenticationContext);
  const [email, setemail] = useState('test@gmail.com');
  const [password, setpassword] = useState('testtest');
  const [errorText, seterrorText] = useState('');

  const validateLogin = async () => {
    if (!email || !password) return;
    const error = await login(email, password);
    seterrorText(error);
  };
  return (
    <NativeBaseProvider>
      <Center pt={20}>
        <Heading>Login</Heading>
      </Center>
      <VStack>
        <Center>
          <Text pt={5} color="secondary.600">
            {errorText}
          </Text>
        </Center>
        <Box p={5}>
          <FormControl pt={2} isRequired>
            <HStack alignItems="center" p={2}>
              <MaterialIcon name="alternate-email" size={20} color="gray" />
              <Divider orientation="vertical" color="black" m={3} />
              <VStack space={1}>
                <Heading
                  position="absolute"
                  ml={4}
                  fontWeight="400"
                  fontSize="xs">
                  E-mail
                </Heading>
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
          <FormControl pt={2} isRequired>
            <HStack alignItems="center" p={2}>
              <MaterialIcon name="lock" size={20} color="gray" />
              <Divider orientation="vertical" color="black" m={3} />

              <VStack space={1}>
                <Heading
                  position="absolute"
                  ml={4}
                  fontWeight="400"
                  fontSize="xs">
                  Mot de passe
                </Heading>
                <Input
                  value={password}
                  placeholder="Mot de Passe"
                  secureTextEntry
                  fontSize={22}
                  variant="unstyled"
                  onChangeText={value => setpassword(value)}
                />
              </VStack>
            </HStack>
            <Divider />
          </FormControl>
        </Box>
        <Center>
          <Link>
            <Text color="blueGray.600">Mot de passe oublié ?</Text>
          </Link>

          <Button
            mt={5}
            size="lg"
            bg="#295BE0"
            _text={{color: 'white'}}
            width={300}
            rounded={40}
            onPress={validateLogin}>
            Login
          </Button>
        </Center>
        <Center pt={5}>
          <HStack>
            <Text>Vous n'avez pas de compte,</Text>
            <Link
              onPress={() => navigation.navigate('Register')}
              _text={{color: 'primary.600'}}>
              {' '}
              créer
            </Link>
          </HStack>
        </Center>
      </VStack>
      <VStack pt={10}>
        <SocialAuth />
      </VStack>
    </NativeBaseProvider>
  );
};

export default Login;
