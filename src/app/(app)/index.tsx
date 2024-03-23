import {FontAwesome} from '@expo/vector-icons';
import {Link, Stack} from 'expo-router';
import {useCallback} from 'react';
import {TouchableOpacity, View, Text, Pressable} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {useUserStore} from '~global/GlobalStores/user-store';

export default function TabOneScreen() {
    const {styles, theme} = useStyles(styleSheet);
    const setUser = useUserStore((state) => state.setUser);

    const onPressSignOut = useCallback(() => {
        setUser(undefined);
    }, [setUser]);

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({pressed}) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color={theme.colors.primary100}
                                        style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <TouchableOpacity onPress={onPressSignOut} style={styles.touchable}>
                <Text style={styles.title}>Sign Out</Text>
            </TouchableOpacity>
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
}));
