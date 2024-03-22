import {MMKV} from 'react-native-mmkv';

export const generalStorage = new MMKV({id: 'general'});
export const userStorage = new MMKV({id: 'user'});
export const zustandStorage = new MMKV({id: 'zustand'});
export const reactQueryStorage = new MMKV({id: 'react-query'});