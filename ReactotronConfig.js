import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure() // controls connection & communication settings
    // .use(plugin()) //  <- here i am!
    .useReactNative({
        asyncStorage: false, // there are more options to the async storage.
        networking: {
            // optionally, you can turn it off with false.
            ignoreUrls: /generate_204|symbolicate|logs/,
        },
        editor: true, // there are more options to editor
        errors: {veto: (stackFrame) => false}, // or turn it off with false
        // errors: {veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0},
        overlay: false, // just turning off overlay
    });

// let's connect!
if (__DEV__) {
    reactotron.connect({enabled: __DEV__});

    //show console log in reactotron too
    const oldConsoleLog = console.log;

    console.log = (...args) => {
        oldConsoleLog(...args);

        Reactotron.display({
            name: 'CONSOLE.LOG',
            value: args,
            preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
        });
    };
}
export default reactotron;
