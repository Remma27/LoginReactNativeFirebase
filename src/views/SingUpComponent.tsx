/* eslint-disable prettier/prettier */
// SignUpComponent.js
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';

const SignUpComponent = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      if (user) {
        await db().collection('users').doc(user.uid).set({
          id: user.uid,
          email: user.email,
          name: name,
          job: job,
        });

        console.log('User data saved successfully:', user);
        Alert.alert('Sign Up Successful', 'Your account has been created.');
      } else {
        console.log('No user found after sign up');
      }
    } catch (error: any) {
      console.error('Sign up failed:', error.message);
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    // Navegar a la pantalla de inicio de sesión
    navigation.navigate('Login'); // Asegúrate de tener la ruta 'Login' configurada en tu navegador
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>Create New Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Job"
          value={job}
          onChangeText={text => setJob(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Create account" onPress={signUp} />
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={goToLogin}>
                Log in
              </Text>
            </Text>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
  },
  loginLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default SignUpComponent;
