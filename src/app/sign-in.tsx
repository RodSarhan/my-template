import {MaterialCommunityIcons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {useCallback} from 'react';
import {TouchableOpacity, View, Text, Pressable} from 'react-native';
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
            <TouchableOpacity onPress={onPressSignIn} style={styles.touchable}>
                <Text style={styles.title}>Sign In</Text>
            </TouchableOpacity>
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
        alignItems: 'center',
        backgroundColor: theme.colors.primary900,
        paddingTop: runtime.insets.top,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary800,
    },
    touchable: {
        backgroundColor: theme.colors.primary300,
        padding: 40,
        borderRadius: 5,
    },
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
