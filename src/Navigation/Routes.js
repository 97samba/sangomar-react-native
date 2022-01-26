import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import AppStack from './AppStack';
import {AuthenticationContext} from './AuthenticationProvider';
import AuthStack from './AuthStack';
import auth from '@react-native-firebase/auth';

const Routes = () => {
  const [initializing, setinitializing] = useState(true);
  const {user, setuser} = useContext(AuthenticationContext);

  const onAuthStateChanged = async user => {
    // var informations = {};
    // if (user) {
    //   console.log(`user.uid`, user.uid);
    //   await firestore()
    //     .collection('users')
    //     .doc(user.uid)
    //     .get()
    //     .then(query => (informations = {...query.data()}));
    // }
    console.log(`user`, user);
    setuser(user);
    user && user.displayName === null
      ? user.updateProfile({displayName: 'Utilisateur'})
      : null;
    initializing && setinitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
