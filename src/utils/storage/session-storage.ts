import { isBrowser } from '../dom/device-detection';
import type { TypeStorage } from '../../types';
import { isNil, isPrimitive, Map } from './storage-utils';

const setStorageItem = (key: string, object: unknown) => {
  const value = typeof object === 'string' ? object : JSON.stringify(object);
  window.sessionStorage?.setItem(key, value);
};

export const SessionStorage: TypeStorage = {
  has: (key: string) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return !isNil(item);
    } catch (error) {
      return false;
    }
  },
  json: <T>() => window.sessionStorage as unknown as T,
  deleteAll: () => {
    Map(window.sessionStorage, SessionStorage.delete);
  },
  get: <T>(key: string) => {
    try {
      let value = null;
      try {
        if (isBrowser() && window.sessionStorage) {
          value = window.sessionStorage?.getItem(key);
        }
        return JSON.parse(value as never) as T;
      } catch {
        return value;
      }
    } catch (error) {
      console.error('SessionStorage get error:', error);
      return null;
    }
  },
  delete: key => {
    try {
      if (isBrowser() && window.sessionStorage) window.sessionStorage?.removeItem(key);
    } catch (error) {
      console.error('SessionStorage delete error:', error);
    }
  },
  set: (key, object) => {
    try {
      if (isBrowser() && window.sessionStorage) {
        isPrimitive(object) ? setStorageItem(key, object as unknown as string) : setStorageItem(key, JSON.stringify(object));
      }
    } catch (error) {
      console.error('SessionStorage set error:', error);
    }
  },
};
