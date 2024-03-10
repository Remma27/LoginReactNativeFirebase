/* eslint-disable prettier/prettier */
// LoginComponent.js
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

const LoginComponent = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log(response);
      Alert.alert('Sign In Successful', 'You are now signed in.');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Sign In Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToSignUp = () => {
    // Navegar a la pantalla de registro
    navigation.navigate('SignUpComponent'); // Asegúrate de tener la ruta 'SignUp' configurada en tu navegador
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>Login</Text>
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
            <Button title="Login" onPress={signIn} />
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text style={styles.signupLink} onPress={goToSignUp}>
                Sign up
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
  signupText: {
    marginTop: 20,
    textAlign: 'center',
  },
  signupLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default LoginComponent;
