/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import List from './src/views/List';
import {useEffect, useState, useCallback} from 'react';
import {User} from 'firebase/auth';
import auth from '@react-native-firebase/auth';
import Login from './src/views/Login';
import SignUpComponent from './src/views/SingUpComponent';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Information" component={List} />
      <InsideStack.Screen name="Login" component={Login} />
      <InsideStack.Screen name="SignUpComponent" component={SignUpComponent} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const onAuthStateChanged = useCallback(
    (user: User | null) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      onAuthStateChanged(user as User | null);
    });

    // Cleanup the subscription when the component unmounts
    return subscriber;
  }, [onAuthStateChanged]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUpComponent"
              component={SignUpComponent}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
