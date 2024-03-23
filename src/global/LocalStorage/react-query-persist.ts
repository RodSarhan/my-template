import {reactQueryStorage} from '~libs/mmkv-clients';
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';

const reactQueryPersistStorage =
    typeof window != 'undefined'
        ? {
              setItem: (key: string, value: any) => {
                  reactQueryStorage.set(key, value);
              },
              getItem: (key: string) => {
                  const value = reactQueryStorage.getString(key);
                  return value === undefined ? null : value;
              },
              removeItem: (key: string) => {
                  reactQueryStorage.delete(key);
              },
          }
        : undefined;

export const reactQueryClientPersister = createSyncStoragePersister({
    storage: reactQueryPersistStorage,
});
