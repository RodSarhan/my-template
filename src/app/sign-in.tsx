import {MaterialCommunityIcons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, Pressable, PressableStateCallbackType} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {HStack} from '~components/common/HStack';
import {useGeneralStore} from '~global/GlobalStores/general-store';
import {useUserStore} from '~global/GlobalStores/user-store';
import {changeAppLanguage} from '~localization/i18n';
import {bustPersistQueryClient, removeAllQueries} from '~networking/clients/query-client';

export default function SingInScreen() {
    const language = useGeneralStore((state) => state.language);
    const {styles, theme} = useStyles(sheet);
    const toggleTheme = useGeneralStore((state) => state.toggleTheme);
    const setUser = useUserStore((state) => state.setUser);
    const {t} = useTranslation();

    const onPressSignIn = useCallback(() => {
        setUser({username: 'jhon', fullName: 'John Doe'});
        removeAllQueries();
        bustPersistQueryClient('jhon');
        router.replace('/');
    }, [setUser]);

    const toggleLanguage = useCallback(() => {
        const nextLanguage = language === 'en' ? 'fr' : 'en';
        changeAppLanguage(nextLanguage);
    }, [language]);

    return (
        <View style={styles.container}>
            <Pressable onPress={onPressSignIn} style={styles.signInPressable}>
                <Text style={styles.buttonLabel}>{t('sign-in')}</Text>
            </Pressable>
            <HStack style={styles.hstack}>
                <Pressable onPress={toggleTheme} style={styles.themeButton}>
                    <MaterialCommunityIcons
                        name="theme-light-dark"
                        color={theme.colors.primary900}
                        size={22}
                    />
                </Pressable>
                <Pressable onPress={toggleLanguage} style={styles.langButton}>
                    <Text
                        style={{color: theme.colors.primary900, fontSize: 20, fontWeight: 'bold'}}
                    >
                        {language.substring(0, 2).toUpperCase()}
                    </Text>
                </Pressable>
            </HStack>
        </View>
    );
}

const sheet = createStyleSheet((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary900,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary800,
    },
    signInPressable: ({pressed}: PressableStateCallbackType) => ({
        backgroundColor: theme.colors.bg500,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        opacity: pressed ? 0.5 : 1,
    }),
    hstack: {
        marginTop: 'auto',
        marginBottom: 75,
        justifyContent: 'space-between',
    },
    themeButton: {
        borderRadius: 100,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary200,
    },
    langButton: {
        borderRadius: 100,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary200,
    },
}));
