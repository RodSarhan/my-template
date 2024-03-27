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

export const zustandPersistStorage: StateStorage = {
    getItem: (key: string) => {
        return getZustandStorageValue(key) || null;
    },
    setItem: (name: string, value: string) => {
        setZustandStorageValue(name, value);
    },
    removeItem: (name: string) => {
        removeZustandStorageValue(name);
    },
};
