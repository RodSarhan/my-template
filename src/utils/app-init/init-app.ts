import * as SplashScreen from 'expo-splash-screen';
import {enableFreeze} from 'react-native-screens';
//init unistyles
import '~styles/unistyles';
//init zustand
import '~global/GlobalStores/general-store';
import '~global/GlobalStores/user-store';
//init react-query
import '~networking/clients/query-client';
//init localization
import '~localization/i18n';
import '~libs/dayjs';
import '~libs/reactotron';

//enable screen freeze (disable UI rerenders for invisible navigation tree)
enableFreeze(true);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
