import {zustandStorage} from '~libs/mmkv-clients';
import {StateStorage} from 'zustand/middleware';

const getZustandStorageValue = (key: string) => {
    return zustandStorage.getString(key);
};

const setZustandStorageValue = (key: string, value: string) => {
    zustandStorage.set(key, value);
};

const removeZustandStorageValue = (key: string) => {
    zustandStorage.delete(key);
};

export const zustandPersistStorage: StateStorage =
    typeof window != 'undefined'
        ? {
              getItem: async (key: string): Promise<string | null> => {
                  return getZustandStorageValue(key) || null;
              },
              setItem: async (name: string, value: string): Promise<void> => {
                  return setZustandStorageValue(name, value);
              },
              removeItem: async (name: string): Promise<void> => {
                  return removeZustandStorageValue(name);
              },
          }
        : (undefined as unknown as StateStorage);
