/* eslint-disable prettier/prettier */

import {View, Button, Alert, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  job: string;
}

const List = ({navigation}: RouterProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (user: any) => {
    try {
      const userDoc = await db().collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const userData = userDoc.data() as UserData;
        setUserData(userData);
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        await fetchUserData(user);
      } else {
        console.log('No user logged in');
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userData && !loading) {
      const user = auth().currentUser;
      if (user) {
        fetchUserData(user);
      }
    }
  }, [userData, loading]);

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
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading user data...</Text>
      ) : userData ? (
        <>
          <Text style={styles.userInfo}>ID: {userData.id}</Text>
          <Text style={styles.userInfo}>Email: {userData.email}</Text>
          <Text style={styles.userInfo}>Name: {userData.name}</Text>
          <Text style={styles.userInfo}>Job: {userData.job}</Text>
        </>
      ) : (
        <Text style={styles.noUserData}>No user data available.</Text>
      )}
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noUserData: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default List;
