import {
    Button,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
    Text,
    GestureResponderEvent,
} from 'react-native';
import {useState, useEffect, useMemo, useCallback} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import switchTheme from 'react-native-theme-switch-animation';
import {useGeneralStore} from '~global/GlobalStores/general-store';
import {router, usePathname} from 'expo-router';

export default function TabOneScreen() {
    const {styles, theme} = useStyles(styleSheet);
    const toggleTheme = useGeneralStore((state) => state.toggleTheme);
    const pathname = usePathname();
    console.log('pathname', pathname);

    const onPressChangeTheme = useCallback(
        (e: GestureResponderEvent) => {
            e.currentTarget.measure((x1, y1, width, height, px, py) => {
                switchTheme({
                    switchThemeFunction: toggleTheme,
                    animationConfig: {
                        type: 'circular',
                        duration: 500,
                        startingPoint: {
                            cy: py + height / 2,
                            cx: px + width / 2,
                        },
                    },
                });
            });
        },
        [theme],
    );

    const onPressNavigateToTwo = useCallback(() => {
        // navigate to tab two
        router.navigate({
            pathname: '/two',
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={{height: 50, width: 50, backgroundColor: theme.colors.primary300}} />
            <View style={{marginTop: 50}} />
            <TouchableOpacity onPress={onPressNavigateToTwo} style={styles.touchable}>
                <Text style={styles.title}>navigate to two</Text>
            </TouchableOpacity>
            <View style={{marginTop: 200}} />
            <TouchableOpacity
                onPress={onPressChangeTheme}
                style={{
                    height: 50,
                    width: 50,
                    marginLeft: 100,
                    backgroundColor: theme.colors.primary200,
                }}
            />
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
