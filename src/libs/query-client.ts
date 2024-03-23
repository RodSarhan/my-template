import {reactQueryClientPersister} from '~global/LocalStorage/react-query-persist';
import {QueryClient} from '@tanstack/react-query';
import {persistQueryClient} from '@tanstack/react-query-persist-client';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
    },
});

persistQueryClient({
    queryClient,
    persister: reactQueryClientPersister,
    maxAge: 1000 * 60 * 60 * 12, // half a day
    //TODO bust the cache
    // read the docs, might need to do so manually during login and logout with subscribe
    buster: 'userID',
});
