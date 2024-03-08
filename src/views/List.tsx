/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {View, Button, Alert} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({navigation}: RouterProps) => {
  const navigateToDetails = () => {
    navigation.navigate('Details');
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('Logout', 'User signed out successfully');
        console.log('User signed out');
        navigation.navigate('Login');
      })
      .catch((error: any) => {
        console.error(error);
        Alert.alert('Logout Failed', 'An error occurred while signing out.');
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={navigateToDetails} title="Go to details" />
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default List;
