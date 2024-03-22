import {USER_STORAGE_VERSION} from '~constants/app-constants';
import {userStorage} from '~libs/mmkv-clients';

export const USER_STORAGE_KEYS = {
    VERSION: 'version',
} as const;

const setUserStorageVersion = (value: number) => {
    userStorage.set(USER_STORAGE_KEYS.VERSION, value);
};
const getUserStorageVersion = () => {
    return userStorage.getNumber(USER_STORAGE_KEYS.VERSION);
};

function clearUserStorage() {
    console.log('resetting user storage');
    userStorage.clearAll();
    setUserStorageVersion(USER_STORAGE_VERSION);
}

export const userStorageFunctions = {
    setUserStorageVersion,
    getUserStorageVersion,
    clearUserStorage,
} as const;
