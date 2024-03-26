import {reactQueryClientPersister} from '~global/LocalStorage/react-query-persist';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientOptions, persistQueryClient} from '@tanstack/react-query-persist-client';
import {defaultShouldDehydrateQuery} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import {onlineManager} from '@tanstack/react-query';
import {useUserStore} from '~global/GlobalStores/user-store';

onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
    });
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'offlineFirst',
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 60 * 12, // half a day
        },
    },
});

const persistClientOptions = (buster?: string): PersistQueryClientOptions => ({
    queryClient,
    persister: reactQueryClientPersister,
    maxAge: 1000 * 60 * 60 * 12, // half a day
    buster: buster ?? 'unknown-user',
    dehydrateOptions: {
        shouldDehydrateQuery: (query) => {
            return defaultShouldDehydrateQuery(query) && query.meta?.persist !== false;
        },
        shouldDehydrateMutation: (mutation) => {
            return false;
        },
    },
});

persistQueryClient(persistClientOptions(useUserStore.getState().user?.username));

export const bustPersistQueryClient = (buster?: string) => {
    persistQueryClient(persistClientOptions(buster));
};

export const removeAllQueries = () => {
    queryClient.removeQueries();
};
