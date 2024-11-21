import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStorage } from "@/types/IStorage";

export const useStorage = () => {
  const create = (): IStorage => ({
    get: async (key: string): Promise<string | null> => {
      try {
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (error) {
        console.error(`Error getting item with key "${key}":`, error);
        return null;
      }
    },
    set: async (key: string, value: string): Promise<void> => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error setting item with key "${key}":`, error);
      }
    },
    remove: async (key: string): Promise<void> => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item with key "${key}":`, error);
      }
    },
    clear: async (): Promise<void> => {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        console.error("Error clearing AsyncStorage:", error);
      }
    },
    getJSON: async <T>(key: string): Promise<T | null> => {
      try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error(`Error getting JSON with key "${key}":`, error);
        return null;
      }
    },
    setJSON: async (key: string, value: any): Promise<void> => {
      try {
        const stringValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, stringValue);
      } catch (error) {
        console.error(`Error setting JSON with key "${key}":`, error);
      }
    },
  });

  const storageInstance = {
    async: create(),
  };

  return { storage: storageInstance };
};
