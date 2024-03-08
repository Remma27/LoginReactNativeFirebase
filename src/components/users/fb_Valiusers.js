/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const ValiUser = props => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);

    const [user, setUser] = useState();

    // Handle user state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [onAuthStateChanged]);

    if (initializing) {
        return null;
    }

    if (!user) {
        return (
            <View>
                <Text>You need to log in</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>Welcome {user.email}</Text>
        </View>
    );
};

export default ValiUser;
