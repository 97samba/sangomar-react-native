import React, {useContext} from 'react';
import {Center, Text, HStack, View} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Pressable} from 'react-native';
import {AuthenticationContext} from '../../Navigation/AuthenticationProvider';

const SocialAuth = () => {
  //   const {singnWithGoogle, singnWithFacebook} = useContext(
  const {singnWithGoogle} = useContext(AuthenticationContext);
  return (
    <Center>
      <HStack space={5}>
        <Pressable
          onPress={async () =>
            singnWithGoogle().then(() => console.log('google auth'))
          }>
          <View border={1} borderColor="gray.300" py={3} px={10} rounded={12}>
            <FontAwesome name="google" size={25} color="#e34133" />
          </View>
        </Pressable>
        <Pressable
        //   onPress={async () =>
        //     singnWithFacebook().then(() => console.log('facebook auth'))
        //   }
        >
          <View border={1} borderColor="gray.300" py={3} px={10} rounded={12}>
            <MaterialIcon name="facebook" size={25} color="#4267B2" />
          </View>
        </Pressable>
        <Pressable>
          <View border={1} borderColor="gray.300" py={3} px={10} rounded={12}>
            <FontAwesome name="apple" size={25} color="black" />
          </View>
        </Pressable>
      </HStack>
      <Text mt={2} fontSize="sm">
        Se connecter avec les réseaux
      </Text>
    </Center>
  );
};

export default SocialAuth;
