import {Button, StyleSheet, Switch, TouchableOpacity, View, Text} from 'react-native';
import {useState, useEffect, useMemo, useCallback} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {changeTheme} from '~styles/theme';
import switchTheme from 'react-native-theme-switch-animation';

export default function TabOneScreen() {
    const {styles, theme} = useStyles(styleSheet);
    const onPressChangeTheme = useCallback(() => {
        switchTheme({
            switchThemeFunction: () => {
                changeTheme(theme.theme === 'light' ? 'dark' : 'light');
            },
            animationConfig: {
                type: 'circular',
                duration: 900,
                startingPoint: {
                    cxRatio: 0.5,
                    cyRatio: 0.5,
                },
            },
        });
    }, [theme]);
    return (
        <View style={styles.container}>
            <View style={{marginTop: 200}} />
            <View style={{height: 50, width: 50, backgroundColor: theme.colors.primary500}} />
            <View style={{marginTop: 50}} />
            <TouchableOpacity onPress={onPressChangeTheme} style={styles.touchable}>
                <Text style={styles.title}>Let's Test Theme animation</Text>
            </TouchableOpacity>
            <View style={{marginTop: 200}} />
            <TouchableOpacity
                onPress={(e) => {
                    e.currentTarget.measure((x1, y1, width, height, px, py) => {
                        switchTheme({
                            switchThemeFunction: () => {
                                changeTheme(theme.theme === 'light' ? 'dark' : 'light');
                            },
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
                }}
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary100,
    },
    touchable: {
        backgroundColor: theme.colors.primary500,
        padding: 40,
        borderRadius: 5,
    },
}));
