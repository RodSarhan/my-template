import {MaterialCommunityIcons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {useCallback} from 'react';
import {View, Text, Pressable, PressableStateCallbackType} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {useGeneralStore} from '~global/GlobalStores/general-store';
import {useUserStore} from '~global/GlobalStores/user-store';

export default function SingInScreen() {
    const {styles, theme} = useStyles(styleSheet);
    const toggleTheme = useGeneralStore((state) => state.toggleTheme);
    const setUser = useUserStore((state) => state.setUser);

    const onPressSignIn = useCallback(() => {
        setUser({username: 'jhon', fullName: 'John Doe'});
        router.replace('/');
    }, [setUser]);

    return (
        <View style={styles.container}>
            <Pressable onPress={onPressSignIn} style={styles.signInPressable}>
                <Text style={styles.title}>Sign In</Text>
            </Pressable>
            <Pressable onPress={toggleTheme} style={styles.themeButton}>
                <MaterialCommunityIcons
                    name="theme-light-dark"
                    color={theme.colors.primary900}
                    size={22}
                />
            </Pressable>
        </View>
    );
}

const styleSheet = createStyleSheet((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary900,
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary800,
    },
    signInPressable: ({pressed}: PressableStateCallbackType) => ({
        backgroundColor: theme.colors.bg500,
        padding: 10,
        borderRadius: 10,
        width: '50%',
        alignItems: 'center',
        opacity: pressed ? 0.5 : 1,
    }),
    themeButton: {
        borderRadius: 100,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary200,
        alignSelf: 'flex-start',
        marginTop: 'auto',
        marginBottom: 75,
        marginStart: 15,
    },
}));
