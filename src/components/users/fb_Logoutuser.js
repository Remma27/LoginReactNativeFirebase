/* eslint-disable prettier/prettier */

/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const Dashboard = ({ navigation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const signOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User is signed out!');
                navigation.navigate('Login');
            })
            .catch(error => console.error(error));
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.textStyle}>
                        Hello, {user.displayName}
                    </Text>

                    <Button
                        color="#3740FE"
                        title="Logout"
                        onPress={signOut}
                    />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20
    }
});

export default Dashboard;
