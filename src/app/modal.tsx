import {StatusBar} from 'expo-status-bar';
import {Platform, View, Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export default function ModalScreen() {
    const {styles} = useStyles(sheet);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal</Text>
            <View style={styles.separator} />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const sheet = createStyleSheet({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        color: 'black',
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
