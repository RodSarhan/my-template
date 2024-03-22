import {generalStorageFunctions} from '~global/LocalStorage/general-storage';
import {userStorageFunctions} from '~global/LocalStorage/user-storage';

export const LocalStorage = {
    user: userStorageFunctions,
    general: generalStorageFunctions,
};
