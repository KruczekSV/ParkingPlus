import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = () => ({
  get: async (key: string) => AsyncStorage.getItem(`${key}`),
  set: async (key: string, value: string) =>
    AsyncStorage.setItem(`${key}`, value),
  remove: async (key: string) => AsyncStorage.removeItem(`${key}`),
  clear: async () => {
    const keys = await AsyncStorage.getAllKeys();
    const filteredKeys = keys.filter((k) => k.startsWith(``));
    await AsyncStorage.multiRemove(filteredKeys);
  },
  getJSON: async <T>(key: string) => {
    const value = await AsyncStorage.getItem(`${key}`);
    return value ? JSON.parse(value) : null;
  },
  setJSON: async <T>(key: string, value: T) =>
    AsyncStorage.setItem(`${key}`, JSON.stringify(value)),
});
